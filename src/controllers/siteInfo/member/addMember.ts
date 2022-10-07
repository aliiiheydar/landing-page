import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../../helper'
import siteInfoService from "../../../db/models/siteInfo/siteInfo.service"
import { allowedImageFormats } from '../../../utils/constants'

const addMember = async (req: Request, res: Response) => {
  const validationSchema = yup.object().shape({
    englishName: yup.string().required(),
    englishRole: yup.string().required(),
    germanName: yup.string().required(),
    germanRole: yup.string().required(),
    images: yup.array().of(yup.object({
      format: yup.string().oneOf(allowedImageFormats).required(),
      data: yup.mixed<Buffer>().required()
    })).required(),
  })

	const handle = async () => {
    const { englishName, englishRole, germanName, germanRole, images } = req.body

    const newMember = {
      englishName: englishName.trim(),
      englishRole,
      germanName: germanName.trim(),
      germanRole,
      images
    }


		return await siteInfoService.addMember(newMember)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default addMember
