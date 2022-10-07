import { Router } from 'express'

import auth from "../../../middlewares/auth"
import addSatisfaction from './addSatisfaction'
import getSatisfaction from './getSatisfaction'
import getSatisfactions from './getSatisfactions'
import editSatisfaction from './editSatisfaction'
import deleteSatisfaction from './deleteSatisfaction'


export const panelSatisfactionRouter = Router()
export const websiteSatisfactionRouter = Router()

/**
 * @swagger
 * tags:
 * - name: Site info | Satisfaction | Panel
 *   description: Satisfaction routes for panel
 * - name: Site info | Satisfaction | Website
 *   description: Satisfaction routes for website
 */



/**
 * @swagger
 * /panel/site-info/satisfaction:
 *   post:
 *     tags:
 *       - Site info | Satisfaction | Panel
 *     summary: Add a satisfaction
 *     description: Add a satisfaction
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
 *               - images
 *     responses:
 *       200:
 *         description: Created satisfaction
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 satisfaction:
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
panelSatisfactionRouter.post('/', auth('admin'), addSatisfaction)



/**
 * @swagger
 * /panel/site-info/satisfaction/{satisfactionId}:
 *   get:
 *     tags:
 *       - Site info | Satisfaction | Panel
 *     summary: Get a satisfaction
 *     description: Get a satisfaction by id
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: satisfactionId
 *         in: path
 *         required: true
 *         description: The ID of the satisfaction
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The expected satisfaction
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 satisfaction:
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
panelSatisfactionRouter.get('/:satisfactionId', auth('admin'), getSatisfaction)



/**
 * @swagger
 * /panel/site-info/satisfaction:
 *   get:
 *     tags:
 *       - Site info | Satisfaction | Panel
 *     summary: Get all satisfactions
 *     description: Get all satisfactions
 *     security:
 *       - adminBearerAuth: []
 *     responses:
 *       200:
 *         description: List of the satisfactions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 satisfactions:
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
panelSatisfactionRouter.get('/', auth('admin'), getSatisfactions)



/**
 * @swagger
 * /panel/site-info/satisfaction/{satisfactionId}:
 *   patch:
 *     tags:
 *       - Site info | Satisfaction | Panel
 *     summary: Edit a satisfaction
 *     description: Edit a satisfaction by id
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: satisfactionId
 *         in: path
 *         required: true
 *         description: The ID of the satisfaction
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
 *         description: Updated satisfaction
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 satisfaction:
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
panelSatisfactionRouter.patch('/:satisfactionId', auth('admin'), editSatisfaction)



/**
 * @swagger
 * /panel/site-info/satisfaction/{satisfactionId}:
 *   delete:
 *     tags:
 *       - Site info | Satisfaction | Panel
 *     summary: Delete a satisfaction
 *     description: Delete a satisfaction by id
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: satisfactionId
 *         in: path
 *         required: true
 *         description: The ID of the satisfaction
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The satisfaction deleted
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
panelSatisfactionRouter.delete('/:satisfactionId', auth('admin'), deleteSatisfaction)



//----------------------------------------------------------------------------------------------------



/**
 * @swagger
 * /website/site-info/satisfaction/{satisfactionId}:
 *   get:
 *     tags:
 *       - Site info | Satisfaction | Website
 *     summary: Get a satisfaction
 *     description: Get a satisfaction by id
 *     parameters:
 *       - name: satisfactionId
 *         in: path
 *         required: true
 *         description: The ID of the satisfaction
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The expected satisfaction
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 satisfaction:
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
websiteSatisfactionRouter.get('/:satisfactionId', getSatisfaction)



/**
 * @swagger
 * /website/site-info/satisfaction:
 *   get:
 *     tags:
 *       - Site info | Satisfaction | Website
 *     summary: Get all satisfactions
 *     description: Get all satisfactions
 *     responses:
 *       200:
 *         description: List of the satisfactions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 satisfactions:
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
websiteSatisfactionRouter.get('/', getSatisfactions)