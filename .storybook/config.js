import {configure} from '@storybook/react'
import {setOptions} from '@storybook/addon-options'

setOptions({
  goFullScreen: false,
  showLeftPanel: true,
  showDownPanel: true,
  showSearchBox: false,
  downPanelInRight: true,
})

function loadStories() {
  require('../stories/index.js')
}

configure(loadStories, module)
