import { SheetsRegistry }                          from 'jss'
import { createMuiTheme, createGenerateClassName } from '@material-ui/core/styles'
import teal                                        from '@material-ui/core/colors/teal'
import amber                                       from '@material-ui/core/colors/amber'
import { FontWeightProperty } from 'csstype'

const theme = createMuiTheme({
    palette: {
        primary: teal,
        secondary: amber
    },
    typography: {
        useNextVariants: true,
        h6: {
            fontFamily: "'Roboto Condensed', sans-serif",
            fontWeight: 'bold'
        },
        h3: {
            color: '#26464E',
            fontSize: '3rem',
            fontFamily: "'Roboto Condensed', sans-serif",
            fontWeight: 'bold' as FontWeightProperty
        },
    }
})

function createPageContext() {
    return {
        theme,
        // This is needed in order to deduplicate the injection of CSS in the page.
        sheetsManager: new Map(),
        // This is needed in order to inject the critical CSS.
        sheetsRegistry: new SheetsRegistry(),
        // The standard class name generator.
        generateClassName: createGenerateClassName()
    }
}

export default function getPageContext() {
    // Make sure to create a new context for every server-side request so that data
    // isn't shared between connections (which would be bad).
    if (!process['browser']) {
        return createPageContext()
    }

    // Reuse context on the client-side.
    if (!global['__INIT_MATERIAL_UI__']) {
        global['__INIT_MATERIAL_UI__'] = createPageContext()
    }

    return global['__INIT_MATERIAL_UI__']
}
