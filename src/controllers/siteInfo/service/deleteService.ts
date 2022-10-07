import { Request, Response } from 'express'

import { handleRequest } from '../../helper'
import siteInfoService from "../../../db/models/siteInfo/siteInfo.service"

const deleteService = async (req: Request, res: Response) => {
	const handle = async () => {
    const { serviceId } = req.params

		return await siteInfoService.deleteService(serviceId)
	}

	return handleRequest({ req, res, handle })
}

export default deleteService
