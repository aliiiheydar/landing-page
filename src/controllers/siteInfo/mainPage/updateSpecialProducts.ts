import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../../helper'
import siteInfoService from "../../../db/models/siteInfo/siteInfoMainPage.service"

const updateSpecialProducts = async (req: Request, res: Response) => {
  const validationSchema = yup.object().shape({
    specialProducts: yup.array().of(yup.object({
      subcategory: yup.string().required(),
      factory: yup.string().required(),
      products: yup.array().of(yup.string()).required()
    })).required()
  })

	const handle = async () => {
    const { specialProducts } = req.body

		return await siteInfoService.updateSpecialProducts(specialProducts)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default updateSpecialProducts
