import { Request, Response } from 'express'

import { handleRequest } from '../../helper'
import siteInfoService from "../../../db/models/siteInfo/siteInfo.service"

const deleteSatisfaction = async (req: Request, res: Response) => {
	const handle = async () => {
    const { satisfactionId } = req.params

		return await siteInfoService.deleteSatisfaction(satisfactionId)
	}

	return handleRequest({ req, res, handle })
}

export default deleteSatisfaction
