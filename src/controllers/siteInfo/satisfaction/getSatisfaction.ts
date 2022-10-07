import { Request, Response } from 'express'

import { handleRequest } from '../../helper'
import siteInfoService from "../../../db/models/siteInfo/siteInfo.service"

const getSatisfaction = async (req: Request, res: Response) => {
	const handle = async () => {
    const { satisfactionId } = req.params

		return await siteInfoService.getSatisfaction(satisfactionId)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, handle, extractOutput })
}

export default getSatisfaction
