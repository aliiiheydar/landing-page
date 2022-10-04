import config from "../../config"

export const sendCode = async (phone: string, code: number) => {
  // TODO: send sms
  const text = `کد تایید شما: ${code}`
  const url = `http://www.0098sms.com/sendsmslink.aspx?FROM=${config.smsNumber}&TO=${phone}&TEXT=${text}&USERNAME=${config.smsUsername}&PASSWORD=${config.smsPassword}&DOMAIN=0098`

  console.log(text)
}