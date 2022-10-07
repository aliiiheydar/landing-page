import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../../helper'
import siteInfoService from "../../../db/models/siteInfo/siteInfo.service"
import { allowedImageFormats } from '../../../utils/constants'

const addSatisfaction = async (req: Request, res: Response) => {
  const validationSchema = yup.object().shape({
    englishTitle: yup.string().required(),
    englishContent: yup.string().required(),
    germanTitle: yup.string().required(),
    germanContent: yup.string().required(),
    images: yup.array().of(yup.object({
      format: yup.string().oneOf(allowedImageFormats).required(),
      data: yup.mixed<Buffer>().required()
    })).required(),
  })

	const handle = async () => {
    const { englishTitle, englishContent, germanTitle, germanContent, images } = req.body

    const newSatisfaction = {
      englishTitle: englishTitle.trim(),
      englishContent,
      germanTitle: germanTitle.trim(),
      germanContent,
      images
    }


		return await siteInfoService.addSatisfaction(newSatisfaction)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default addSatisfaction
