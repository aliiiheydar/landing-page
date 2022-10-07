import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../../helper'
import siteInfoService from "../../../db/models/siteInfo/siteInfo.service"
import { allowedImageFormats } from '../../../utils/constants'

const addAdvantage = async (req: Request, res: Response) => {
  const validationSchema = yup.object().shape({
    englishTitle: yup.string().required(),
    englishContent: yup.string().required(),
    germanTitle: yup.string().required(),
    germanContent: yup.string().required(),
    icon: yup.object({
      format: yup.string().oneOf(allowedImageFormats).required(),
      data: yup.mixed<Buffer>().required()
    }).required(),
  })

	const handle = async () => {
    const { englishTitle, englishContent, germanTitle, germanContent, icon } = req.body

    const newAdvantage = {
      englishTitle: englishTitle.trim(),
      englishContent,
      germanTitle: germanTitle.trim(),
      germanContent,
      icon
    }


		return await siteInfoService.addAdvantage(newAdvantage)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default addAdvantage
