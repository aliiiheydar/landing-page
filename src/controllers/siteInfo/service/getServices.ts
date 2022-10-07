import { Request, Response } from 'express'

import { handleRequest } from '../../helper'
import siteInfoService from "../../../db/models/siteInfo/siteInfo.service"

const getServices = async (req: Request, res: Response) => {
	const handle = async () => {

		return await siteInfoService.getServices()
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, handle, extractOutput })
}

export default getServices
