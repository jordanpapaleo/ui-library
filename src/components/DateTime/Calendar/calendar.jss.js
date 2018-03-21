const day = {
  boxSizing: 'border-box',
  display: 'inline-block',
  height: 30,
  lineHeight: '30px',
  textAlign: 'center',
  width: `${100 / 7}%`,
  border: '2px solid rgba(255,255,255,0)'
}

const MARGIN_BOTTOM = 15

export const jssStyles = {
  calendarTitle: {
    textAlign: 'center'
  },
  calendar: {
    marginBottom: MARGIN_BOTTOM,
    clear: 'both'
  },
  monthHeader: {
    marginBottom: 0,
    borderTop: '1px solid #eee',
    borderBottom: '1px solid #eee'
  },
  monthButton: {
    color: '#4E5E6A',
    '&:hover': {
      textDecoration: 'none'
    }
  },
  weeks: {
    marginBottom: MARGIN_BOTTOM
  },
  weekDay: {
    ...day,
    fontWeight: 700,
    fontSize: 14
  },
  day: {
    ...day,
    cursor: 'pointer',
    '&.other-month': {
      backgroundColor: '#E8E8E8',
      color: '#989898'
    },
    '&:hover': {
      backgroundColor: '#F7F7F7'
    },
    '&.event': {
      borderRadius: 3
    },
    '&.today': {
      borderColor: '#D3D3D3',
      borderRadius: 3
    },
    '&.selected': {
      backgroundColor: '#22BAA0',
      color: 'white'
    },
    '&.outof-bounds': {
      backgroundColor: '#E8E8E8',
      color: '#D3D3D3',
      cursor: 'default',
      '&:hover': {
        backgroundColor: '#E8E8E8'
      }
    }
  }
}
