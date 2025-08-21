const { mapAuthDataField } = require('../../lib/queryFromFilters');

describe('mapAuthDataField', () => {
  it('should return the same field if no field is provided', () => {
    expect(mapAuthDataField(null)).toBeNull();
    expect(mapAuthDataField(undefined)).toBeUndefined();
  });

  it('should map authData.<provider> to _auth_data_<provider>', () => {
    expect(mapAuthDataField('authData.anonymous')).toBe('_auth_data_anonymous');
    expect(mapAuthDataField('authData.facebook')).toBe('_auth_data_facebook');
  });

  it('should map authData with compareTo as provider', () => {
    expect(mapAuthDataField('authData', 'google')).toBe('_auth_data_google');
    expect(mapAuthDataField('authData', 'customProvider')).toBe('_auth_data_customProvider');
  });

  it('should return the field unchanged if it does not match authData pattern', () => {
    expect(mapAuthDataField('username')).toBe('username');
    expect(mapAuthDataField('email')).toBe('email');
  });
});
