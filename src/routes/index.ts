import { Router } from 'express'

import { panelAdminRouter } from '../controllers/admin'
import { panelBlogRouter, websiteBlogRouter } from '../controllers/blog'
import { panelSiteInfoRouter, websiteSiteInfoRouter } from "../controllers/siteInfo"
import { imageRouter } from "../controllers/image"

const mainRouter = Router()

mainRouter.use('/panel/admin', panelAdminRouter)
mainRouter.use('/panel/blog', panelBlogRouter)
mainRouter.use('/website/blog', websiteBlogRouter)
mainRouter.use('/panel/site-info', panelSiteInfoRouter)
mainRouter.use('/website/site-info', websiteSiteInfoRouter)
mainRouter.use('/image', imageRouter)

export default mainRouter