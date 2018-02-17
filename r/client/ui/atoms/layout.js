import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'


const marginDir = (p) => p.flow === 'column'
  ? 'top'
  : 'left'

export const Layout = styled.div`
  display: flex;
  flex-direction: ${(p) => p.flow};
  flex-wrap: ${(p) => p.wrap};
  padding: ${(p) => `${p.padding}rem`};

  ${(p) => p.width && css`
    width: ${p.width}rem
  `};

  ${(p) => p.justify && css`
    justify-content: ${p.justify}
  `};

  ${(p) => p.gap && css`
    & > * + * {
      margin-${marginDir}: ${p.gap}rem;
    }
  `}
`

Layout.propTypes = {
  flow: PropTypes.oneOf(['column', 'row']).isRequired,
  wrap: PropTypes.oneOf(['wrap', 'nowrap']),
  padding: PropTypes.number,
  gap: PropTypes.number,
  justify: PropTypes.oneOf(['center', 'flex-start', 'flex-end', 'space-between', 'space-around']),
  width: PropTypes.number,
}

Layout.defaultProps = {
  wrap: 'nowrap',
  padding: 0,
  gap: 0,
  justify: undefined,
  width: 0,
}
