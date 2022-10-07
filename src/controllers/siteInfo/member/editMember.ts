import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../../helper'
import siteInfoService from "../../../db/models/siteInfo/siteInfo.service"
import { allowedImageFormats } from '../../../utils/constants'

const editMember = async (req: Request, res: Response) => {
  const validationSchema = yup.object().shape({
    updates: yup.object().shape({
      englishName: yup.string(),
      englishRole: yup.string(),
      germanName: yup.string(),
      germanRole: yup.string(),
      images: yup.array().of(yup.object({
        format: yup.string().oneOf(allowedImageFormats).required(),
        data: yup.mixed<Buffer>().required()
      })),
    }).required()
  })

	const handle = async () => {
    const { memberId } = req.params

    const allowedUpdates = ["englishName", "englishRole", "germanName", "germanRole", 'images']

    const updates: { [key: string]: any} = {}

    Object.keys(req.body.updates || {}).forEach((update) => {
      if(allowedUpdates.includes(update)) {
        if(["englishName", "germanName"].includes(update)) {
          updates[update] = req.body.updates[update].trim()

        } else {
          updates[update] = req.body.updates[update]
        }
      }
    })

		return await siteInfoService.editMember(memberId, updates)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default editMember
