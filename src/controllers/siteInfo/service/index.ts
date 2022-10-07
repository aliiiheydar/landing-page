import { Router } from 'express'

import auth from "../../../middlewares/auth"
import addService from './addService'
import getService from './getService'
import getServices from './getServices'
import editService from './editService'
import deleteService from './deleteService'


export const panelServiceRouter = Router()
export const websiteServiceRouter = Router()

/**
 * @swagger
 * tags:
 * - name: Site info | Service | Panel
 *   description: Service routes for panel
 * - name: Site info | Service | Website
 *   description: Service routes for website
 */



/**
 * @swagger
 * /panel/site-info/service:
 *   post:
 *     tags:
 *       - Site info | Service | Panel
 *     summary: Add a service
 *     description: Add a service
 *     security:
 *       - adminBearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               englishTitle:
 *                 type: string
 *               englishContent:
 *                 type: string
 *               germanTitle:
 *                 type: string
 *               germanContent:
 *                 type: string
 *               icon:
 *                 type: object
 *                 properties:
 *                   format:
 *                     type: string
 *                   data:
 *                     type: string
 *                     format: binary
 *               images:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     format:
 *                       type: string
 *                     data:
 *                       type: string
 *                       format: binary
 *             required:
 *               - englishTitle
 *               - englishContent
 *               - germanTitle
 *               - germanContent
 *               - icon
 *               - images
 *     responses:
 *       200:
 *         description: Created service
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 service:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     englishTitle:
 *                       type: string
 *                     englishContent:
 *                       type: string
 *                     germanTitle:
 *                       type: string
 *                     germanContent:
 *                       type: string
 *                     icon:
 *                       type: string
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                     createdAt:
 *                       type: number
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Not authorized 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       422:
 *         description: Data validation error 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
panelServiceRouter.post('/', auth('admin'), addService)



/**
 * @swagger
 * /panel/site-info/service/{serviceId}:
 *   get:
 *     tags:
 *       - Site info | Service | Panel
 *     summary: Get a service
 *     description: Get a service by id
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: serviceId
 *         in: path
 *         required: true
 *         description: The ID of the service
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The expected service
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 service:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     englishTitle:
 *                       type: string
 *                     englishContent:
 *                       type: string
 *                     germanTitle:
 *                       type: string
 *                     germanContent:
 *                       type: string
 *                     icon:
 *                       type: string
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                     createdAt:
 *                       type: number
 *       401:
 *         description: Not authorized 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
panelServiceRouter.get('/:serviceId', auth('admin'), getService)



/**
 * @swagger
 * /panel/site-info/service:
 *   get:
 *     tags:
 *       - Site info | Service | Panel
 *     summary: Get all services
 *     description: Get all services
 *     security:
 *       - adminBearerAuth: []
 *     responses:
 *       200:
 *         description: List of the services
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 services:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       englishTitle:
 *                         type: string
 *                       englishContent:
 *                         type: string
 *                       germanTitle:
 *                         type: string
 *                       germanContent:
 *                         type: string
 *                       icon:
 *                         type: string
 *                       images:
 *                         type: array
 *                         items:
 *                           type: string
 *                       createdAt:
 *                         type: number
 *                 count:
 *                   type: number
 *       401:
 *         description: Not authorized 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
panelServiceRouter.get('/', auth('admin'), getServices)



/**
 * @swagger
 * /panel/site-info/service/{serviceId}:
 *   patch:
 *     tags:
 *       - Site info | Service | Panel
 *     summary: Edit a service
 *     description: Edit a service by id
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: serviceId
 *         in: path
 *         required: true
 *         description: The ID of the service
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               updates:
 *                 type: object
 *                 properties:
 *                   englishTitle:
 *                     type: string
 *                   englishContent:
 *                     type: string
 *                   germanTitle:
 *                     type: string
 *                   germanContent:
 *                     type: string
 *                   icon:
 *                     type: object
 *                     properties:
 *                       format:
 *                         type: string
 *                       data:
 *                         type: string
 *                         format: binary
 *                   images:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         format:
 *                           type: string
 *                         data:
 *                           type: string
 *                           format: binary
 *     responses:
 *       200:
 *         description: Updated service
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 service:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     englishTitle:
 *                       type: string
 *                     englishContent:
 *                       type: string
 *                     germanTitle:
 *                       type: string
 *                     germanContent:
 *                       type: string
 *                     icon:
 *                       type: string
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                     createdAt:
 *                       type: number
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Not authorized 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       422:
 *         description: Data validation error 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
panelServiceRouter.patch('/:serviceId', auth('admin'), editService)



/**
 * @swagger
 * /panel/site-info/service/{serviceId}:
 *   delete:
 *     tags:
 *       - Site info | Service | Panel
 *     summary: Delete a service
 *     description: Delete a service by id
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: serviceId
 *         in: path
 *         required: true
 *         description: The ID of the service
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The service deleted
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Not authorized 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
panelServiceRouter.delete('/:serviceId', auth('admin'), deleteService)



//----------------------------------------------------------------------------------------------------



/**
 * @swagger
 * /website/site-info/service/{serviceId}:
 *   get:
 *     tags:
 *       - Site info | Service | Website
 *     summary: Get a service
 *     description: Get a service by id
 *     parameters:
 *       - name: serviceId
 *         in: path
 *         required: true
 *         description: The ID of the service
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The expected service
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 service:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     englishTitle:
 *                       type: string
 *                     englishContent:
 *                       type: string
 *                     germanTitle:
 *                       type: string
 *                     germanContent:
 *                       type: string
 *                     icon:
 *                       type: string
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                     createdAt:
 *                       type: number
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
websiteServiceRouter.get('/:serviceId', getService)



/**
 * @swagger
 * /website/site-info/service:
 *   get:
 *     tags:
 *       - Site info | Service | Website
 *     summary: Get all services
 *     description: Get all services
 *     responses:
 *       200:
 *         description: List of the services
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 services:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       englishTitle:
 *                         type: string
 *                       englishContent:
 *                         type: string
 *                       germanTitle:
 *                         type: string
 *                       germanContent:
 *                         type: string
 *                       icon:
 *                         type: string
 *                       images:
 *                         type: array
 *                         items:
 *                           type: string
 *                       createdAt:
 *                         type: number
 *                 count:
 *                   type: number
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
websiteServiceRouter.get('/', getServices)