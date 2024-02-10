const UriPaths = {
  // auth
  register: "/auth/signup",
  authenticate: "/auth/signin",
  validateEmail: "/auth/validate",
  // user
  updateUserInfo: "/users/smth", // [smth] is supposed to be userId but not enforced by BACK-END
  optInVendor: "/vendors",
  updateVendorInfo: "/vendors/smth", // [smth] is supposed to be vendorId but not enforced.
  // space
  spacesBase: "/spaces"
}

export default UriPaths
