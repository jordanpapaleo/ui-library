import '@storybook/addon-notes/register'

import React from 'react'
import Chance from 'chance'
import {storiesOf} from '@storybook/react'
import {withNotes} from '@storybook/addon-notes'
import {action} from '@storybook/addon-actions'
import Address from '../src/Address'
import addressMarkdown from '../src/Address/address.md'

const chance = new Chance()

const address = {
  city: chance.city(),
  state: chance.state(),
  street: chance.address(),
  zipcode: chance.zip()
}

storiesOf('Address', module)
  .add('single line', withNotes(addressMarkdown)(() => <Address address={address} />))
  .add('two lines', withNotes(addressMarkdown)(() => <Address address={address} twoLines />))
  .add('compound component', withNotes(addressMarkdown)(() => (
    <Address address={address} twoLines>
      <Address.Street style={{fontWeight: 'bold', fontSize: 18, lineHeight: 1.1}} />
      <Address.CityStateZip style={{color: 'orange', fontSize: 16, lineHeight: 1.1}} />
    </Address>
  )))
