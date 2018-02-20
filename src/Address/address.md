# Address

## Params

```
address: PropTypes.shape({
  city: PropTypes.string,
  state: PropTypes.string,
  street: PropTypes.string,
  unitNumber: PropTypes.string,
  zipcode: PropTypes.string
}).isRequired

children: PropTypes.any

twoLines: PropTypes.bool
```

## Code Example

```javascript
import {Address} from '@jordanpapaleo/ui-library'
```

### Single line

```javascript
<Address address={address} />
```

### Multi Line

```javascript
<Address address={address} twoLines />
```

### Compound Component

```javascript
<Address address={address} twoLines>
  <Address.Street style={{fontWeight: 'bold', fontSize: 18, lineHeight: 1.1}} />
  <Address.CityStateZip style={{color: 'orange', fontSize: 16, lineHeight: 1.1}} />
</Address>
```
