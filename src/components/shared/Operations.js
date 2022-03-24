const Operations = {
  NEW_PALLET: {
    url: '/asrs/api/pallet/register/{{palletBarcode}}',
    method: 'POST',
    body: null
  },
  CLOSE_PALLET: {
    url: '/asrs/api/pallet/update/{{palletBarcode}}',
    method: 'POST',
    body: {
      sku: null,
      qty: null,
      pkgs: null
    }
  },
  PROFILE_CHECK: {
    url: '/asrs/api/pallet/profilecheck/{{palletBarcode}}',
    method: 'GET',
    body: null
  },
  PROFILE_DONE: {
    url: '/asrs/api/pallet/profilecheck/{{palletBarcode}}',
    method: 'POST',
    body: null
  },
  GET_LOCATION: {
    url: '/asrs/api/storein/{{palletBarcode}}',
    method: 'GET',
    body: null
  },
  CONFIRM_STORE_IN: {
    url: '/asrs/api/storein/{{palletBarcode}}?location={{location_id}}',
    method: 'PATCH',
    body: null
  },
  LOGIN: {
    url: '/asrs/api/login',
    method: 'POST',
    body: {
      username: 'admin',
      password: 'admin'
    }
  },
  GET_PALLET_DETAILS: {
    url: '/asrs/api/pallet/pkgs/{{palletBarcode}}',
    method: 'GET'
  }
};

export default Operations;
