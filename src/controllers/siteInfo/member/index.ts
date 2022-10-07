import { Router } from 'express'

import auth from "../../../middlewares/auth"
import addMember from './addMember'
import getMember from './getMember'
import getMembers from './getMembers'
import editMember from './editMember'
import deleteMember from './deleteMember'


export const panelMemberRouter = Router()
export const websiteMemberRouter = Router()

/**
 * @swagger
 * tags:
 * - name: Site info | Member | Panel
 *   description: Member routes for panel
 * - name: Site info | Member | Website
 *   description: Member routes for website
 */



/**
 * @swagger
 * /panel/site-info/member:
 *   post:
 *     tags:
 *       - Site info | Member | Panel
 *     summary: Add a member
 *     description: Add a member
 *     security:
 *       - adminBearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               englishName:
 *                 type: string
 *               englishRole:
 *                 type: string
 *               germanName:
 *                 type: string
 *               germanRole:
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
 *               - englishName
 *               - englishRole
 *               - germanName
 *               - germanRole
 *               - images
 *     responses:
 *       200:
 *         description: Created member
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 member:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     englishName:
 *                       type: string
 *                     englishRole:
 *                       type: string
 *                     germanName:
 *                       type: string
 *                     germanRole:
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
panelMemberRouter.post('/', auth('admin'), addMember)



/**
 * @swagger
 * /panel/site-info/member/{memberId}:
 *   get:
 *     tags:
 *       - Site info | Member | Panel
 *     summary: Get a member
 *     description: Get a member by id
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: memberId
 *         in: path
 *         required: true
 *         description: The ID of the member
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The expected member
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 member:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     englishName:
 *                       type: string
 *                     englishRole:
 *                       type: string
 *                     germanName:
 *                       type: string
 *                     germanRole:
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
panelMemberRouter.get('/:memberId', auth('admin'), getMember)



/**
 * @swagger
 * /panel/site-info/member:
 *   get:
 *     tags:
 *       - Site info | Member | Panel
 *     summary: Get all members
 *     description: Get all members
 *     security:
 *       - adminBearerAuth: []
 *     responses:
 *       200:
 *         description: List of the members
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 members:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       englishName:
 *                         type: string
 *                       englishRole:
 *                         type: string
 *                       germanName:
 *                         type: string
 *                       germanRole:
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
panelMemberRouter.get('/', auth('admin'), getMembers)



/**
 * @swagger
 * /panel/site-info/member/{memberId}:
 *   patch:
 *     tags:
 *       - Site info | Member | Panel
 *     summary: Edit a member
 *     description: Edit a member by id
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: memberId
 *         in: path
 *         required: true
 *         description: The ID of the member
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
 *                   englishName:
 *                     type: string
 *                   englishRole:
 *                     type: string
 *                   germanName:
 *                     type: string
 *                   germanRole:
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
 *         description: Updated member
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 member:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     englishName:
 *                       type: string
 *                     englishRole:
 *                       type: string
 *                     germanName:
 *                       type: string
 *                     germanRole:
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
panelMemberRouter.patch('/:memberId', auth('admin'), editMember)



/**
 * @swagger
 * /panel/site-info/member/{memberId}:
 *   delete:
 *     tags:
 *       - Site info | Member | Panel
 *     summary: Delete a member
 *     description: Delete a member by id
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: memberId
 *         in: path
 *         required: true
 *         description: The ID of the member
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The member deleted
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
panelMemberRouter.delete('/:memberId', auth('admin'), deleteMember)



//----------------------------------------------------------------------------------------------------



/**
 * @swagger
 * /website/site-info/member/{memberId}:
 *   get:
 *     tags:
 *       - Site info | Member | Website
 *     summary: Get a member
 *     description: Get a member by id
 *     parameters:
 *       - name: memberId
 *         in: path
 *         required: true
 *         description: The ID of the member
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The expected member
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 member:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     englishName:
 *                       type: string
 *                     englishRole:
 *                       type: string
 *                     germanName:
 *                       type: string
 *                     germanRole:
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
websiteMemberRouter.get('/:memberId', getMember)



/**
 * @swagger
 * /website/site-info/member:
 *   get:
 *     tags:
 *       - Site info | Member | Website
 *     summary: Get all members
 *     description: Get all members
 *     responses:
 *       200:
 *         description: List of the members
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 members:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       englishName:
 *                         type: string
 *                       englishRole:
 *                         type: string
 *                       germanName:
 *                         type: string
 *                       germanRole:
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
websiteMemberRouter.get('/', getMembers)