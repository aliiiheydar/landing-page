import { Request, Response } from 'express'

import { handleRequest } from '../../helper'
import siteInfoService from "../../../db/models/siteInfo/siteInfo.service"

const getMember = async (req: Request, res: Response) => {
	const handle = async () => {
    const { memberId } = req.params

		return await siteInfoService.getMember(memberId)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, handle, extractOutput })
}

export default getMember
