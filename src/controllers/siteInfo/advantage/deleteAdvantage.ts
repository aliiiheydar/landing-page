import { Request, Response } from 'express'

import { handleRequest } from '../../helper'
import siteInfoService from "../../../db/models/siteInfo/siteInfo.service"

const deleteAdvantage = async (req: Request, res: Response) => {
	const handle = async () => {
    const { advantageId } = req.params

		return await siteInfoService.deleteAdvantage(advantageId)
	}

	return handleRequest({ req, res, handle })
}

export default deleteAdvantage
