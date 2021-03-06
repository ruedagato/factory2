import Button, { ButtonProps } from '@material-ui/core/Button'
import Spinner from './Spinner'
import * as React from 'react'

type IProps = {
    loader?: boolean
} & ButtonProps

export default (props: IProps) => {
    const { loader } = props
    const buttonProps = Object.assign({}, props)
    delete buttonProps['loader']
    return (
        <Button {...buttonProps} disabled={loader} style={{ minWidth: 200, padding: '13px 16px', ...props.style }}>
            {loader ? <Spinner size={21} width={2} /> : props.children}
        </Button>
    )
}
