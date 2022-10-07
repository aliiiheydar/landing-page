import { Request, Response } from 'express'

import { handleRequest } from '../../helper'
import siteInfoService from "../../../db/models/siteInfo/siteInfo.service"

const deleteMember = async (req: Request, res: Response) => {
	const handle = async () => {
    const { memberId } = req.params

		return await siteInfoService.deleteMember(memberId)
	}

	return handleRequest({ req, res, handle })
}

export default deleteMember
