export const statusCodes = {
  ok: 200,
  created: 201,
  noContent: 204,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
  ise: 500, //internalServerError
  serviceUnavailable: 503,
  ue: 422, //unprocessableEntity
  userNotFound: 404,
  userNotVerified: 401,
}

export const errorMessages = {
  adminService: {
    godAdminRoleRequired: "شما ادمین اصلی نیستید",
    emailAlreadyTaken: "با ایمیل مورد نظر حساب ادمین وجود دارد",
    phoneAlreadyTaken: "با شماره تلفن مورد نظر حساب ادمین وجود دارد",
    emailNotFound: "با ایمیل مورد نظر حساب کاربری وجود ندارد",
    godAdminAlreadyExists: "ادمین اصلی از قبل وجود دارد",
    incorrectCredentials: "ایمیل یا رمز عبور اشتباه است"
  },
  blogService: {
    titleAlreadyTaken: "با عنوان مورد نظر از قبل بلاگی وجود دارد"
  },
  siteInfo: {
    nameIsTaken: 'این نام تکراری است',
    titleIsTaken: 'این عنوان تکراری است',
    englishNameIsTaken: 'نام انگلیسی تکراری است',
    germanNameIsTaken: 'نام آلمانی تکراری است',
    englishTitleIsTaken: 'عنوان انگلیسی تکراری است',
    germanTitleIsTaken: 'عنوان آلمانی تکراری است',
    phoneIsTaken: 'این تلفن تکراری است',
    questionIsRepetitious: 'این سوال تکراری است',
    imageProblem: 'مشکلی در پردازش تصویر وجود دارد',
    stepExists: 'این مرحله وجود دارد',
    imageMismatch: 'تصویر فرستاده شده نا مناسب است'
  },
  shared: {
    ise: "سرور با مشکل مواجه شده",
    permissionsRequired: "شما دسترسی لازم برای این کار را ندارید",
    unauthorized: "هویت شما احراز نشده است",
    notFound: "محتوای مورد نظر یافت نشد",
    nameMustBeUnique: 'نام انتخاب شده از قبل وجود دارد', 
    slugMustBeUnique: 'شناسه لینک انتخاب شده از قبل وجود دارد',
    noChanges: 'هیچ تغییری وجود ندارد'
  }
}

export const websiteName = 'landing-page'

export const allowedImageFormats = ['svg', 'png', 'jpg', 'jpeg']

export const permissions = []