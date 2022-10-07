import { Router } from 'express'

import { panelAdvantageRouter, websiteAdvantageRouter } from "./advantage"
import { panelServiceRouter, websiteServiceRouter } from "./service"
import { panelMemberRouter, websiteMemberRouter } from "./member"
import { panelSatisfactionRouter, websiteSatisfactionRouter } from "./satisfaction"

export const panelSiteInfoRouter = Router()
export const websiteSiteInfoRouter = Router()

panelSiteInfoRouter.use('/advantage', panelAdvantageRouter)

websiteSiteInfoRouter.use('/advantage', websiteAdvantageRouter)

panelSiteInfoRouter.use('/service', panelServiceRouter)

websiteSiteInfoRouter.use('/service', websiteServiceRouter)

panelSiteInfoRouter.use('/member', panelMemberRouter)

websiteSiteInfoRouter.use('/member', websiteMemberRouter)

panelSiteInfoRouter.use('/satisfaction', panelSatisfactionRouter)

websiteSiteInfoRouter.use('/satisfaction', websiteSatisfactionRouter)


