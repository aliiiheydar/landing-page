import { Router } from 'express'

import auth from "../../../middlewares/auth"
import addAdvantage from './addAdvantage'
import getAdvantage from './getAdvantage'
import getAdvantages from './getAdvantages'
import editAdvantage from './editAdvantage'
import deleteAdvantage from './deleteAdvantage'


export const panelAdvantageRouter = Router()
export const websiteAdvantageRouter = Router()

/**
 * @swagger
 * tags:
 * - name: Site info | Advantage | Panel
 *   description: Advantage routes for panel
 * - name: Site info | Advantage | Website
 *   description: Advantage routes for website
 */



/**
 * @swagger
 * /panel/site-info/advantage:
 *   post:
 *     tags:
 *       - Site info | Advantage | Panel
 *     summary: Add a advantage
 *     description: Add a advantage
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
 *             required:
 *               - englishTitle
 *               - englishContent
 *               - germanTitle
 *               - germanContent
 *               - icon
 *     responses:
 *       200:
 *         description: Created advantage
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 advantage:
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
panelAdvantageRouter.post('/', auth('admin'), addAdvantage)



/**
 * @swagger
 * /panel/site-info/advantage/{advantageId}:
 *   get:
 *     tags:
 *       - Site info | Advantage | Panel
 *     summary: Get a advantage
 *     description: Get a advantage by id
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: advantageId
 *         in: path
 *         required: true
 *         description: The ID of the advantage
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The expected advantage
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 advantage:
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
panelAdvantageRouter.get('/:advantageId', auth('admin'), getAdvantage)



/**
 * @swagger
 * /panel/site-info/advantage:
 *   get:
 *     tags:
 *       - Site info | Advantage | Panel
 *     summary: Get all advantages
 *     description: Get all advantages
 *     security:
 *       - adminBearerAuth: []
 *     responses:
 *       200:
 *         description: List of the advantages
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 advantages:
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
panelAdvantageRouter.get('/', auth('admin'), getAdvantages)



/**
 * @swagger
 * /panel/site-info/advantage/{advantageId}:
 *   patch:
 *     tags:
 *       - Site info | Advantage | Panel
 *     summary: Edit a advantage
 *     description: Edit a advantage by id
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: advantageId
 *         in: path
 *         required: true
 *         description: The ID of the advantage
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
 *     responses:
 *       200:
 *         description: Updated advantage
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 advantage:
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
panelAdvantageRouter.patch('/:advantageId', auth('admin'), editAdvantage)



/**
 * @swagger
 * /panel/site-info/advantage/{advantageId}:
 *   delete:
 *     tags:
 *       - Site info | Advantage | Panel
 *     summary: Delete a advantage
 *     description: Delete a advantage by id
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: advantageId
 *         in: path
 *         required: true
 *         description: The ID of the advantage
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The advantage deleted
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
panelAdvantageRouter.delete('/:advantageId', auth('admin'), deleteAdvantage)



//----------------------------------------------------------------------------------------------------



/**
 * @swagger
 * /website/site-info/advantage/{advantageId}:
 *   get:
 *     tags:
 *       - Site info | Advantage | Website
 *     summary: Get a advantage
 *     description: Get a advantage by id
 *     parameters:
 *       - name: advantageId
 *         in: path
 *         required: true
 *         description: The ID of the advantage
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The expected advantage
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 advantage:
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
websiteAdvantageRouter.get('/:advantageId', getAdvantage)



/**
 * @swagger
 * /website/site-info/advantage:
 *   get:
 *     tags:
 *       - Site info | Advantage | Website
 *     summary: Get all advantages
 *     description: Get all advantages
 *     responses:
 *       200:
 *         description: List of the advantages
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 advantages:
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
websiteAdvantageRouter.get('/', getAdvantages)