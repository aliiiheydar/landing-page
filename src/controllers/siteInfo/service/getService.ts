import { Request, Response } from 'express'

import { handleRequest } from '../../helper'
import siteInfoService from "../../../db/models/siteInfo/siteInfo.service"

const getService = async (req: Request, res: Response) => {
	const handle = async () => {
    const { serviceId } = req.params

		return await siteInfoService.getService(serviceId)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, handle, extractOutput })
}

export default getService
