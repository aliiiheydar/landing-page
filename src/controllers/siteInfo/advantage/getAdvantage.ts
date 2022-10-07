import { Request, Response } from 'express'

import { handleRequest } from '../../helper'
import siteInfoService from "../../../db/models/siteInfo/siteInfo.service"

const getAdvantage = async (req: Request, res: Response) => {
	const handle = async () => {
    const { advantageId } = req.params

		return await siteInfoService.getAdvantage(advantageId)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, handle, extractOutput })
}

export default getAdvantage
