import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../../helper'
import siteInfoService from "../../../db/models/siteInfo/siteInfo.service"
import { allowedImageFormats } from '../../../utils/constants'

const editAdvantage = async (req: Request, res: Response) => {
  const validationSchema = yup.object().shape({
    updates: yup.object().shape({
      englishTitle: yup.string(),
      englishContent: yup.string(),
      germanTitle: yup.string(),
      germanContent: yup.string(),
      icon: yup.object({
        format: yup.string().oneOf(allowedImageFormats).required(),
        data: yup.mixed<Buffer>().required()
      }),
    }).required()
  })

	const handle = async () => {
    const { advantageId } = req.params

    const allowedUpdates = ["englishTitle", "englishContent", "germanTitle", "germanContent", 'icon']

    const updates: { [key: string]: any} = {}

    Object.keys(req.body.updates || {}).forEach((update) => {
      if(allowedUpdates.includes(update)) {
        if(["englishTitle", "germanTitle"].includes(update)) {
          updates[update] = req.body.updates[update].trim()

        } else {
          updates[update] = req.body.updates[update]
        }
      }
    })

		return await siteInfoService.editAdvantage(advantageId, updates)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default editAdvantage
