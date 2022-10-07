import { Router } from 'express'

import auth from "../../middlewares/auth"
import addBlog from './addBlog'
import getBlog from './getBlog'
import getBlogs from './getBlogs'
import getBlogsByTag from './getBlogsByTag'
import editBlog from './editBlog'
import deleteBlogs from './deleteBlogs'
import getTags from './getTags'

export const panelBlogRouter = Router()
export const websiteBlogRouter = Router()

/**
 * @swagger
 * components:
 *  securitySchemes:
 *    userBearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    adminBearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 */


/**
 * @swagger
 * tags:
 * - name: Blog | Panel
 *   description: Blog routes for panel
 * - name: Blog | Website
 *   description: Blog routes for website
 */


/**
 * @swagger
 * /panel/blog:
 *   post:
 *     tags:
 *       - Blog | Panel
 *     summary: Create a new blog
 *     description: Create a new blog
 *     security:
 *       - adminBearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               summary:
 *                 type: string
 *               author:
 *                 type: string
 *               content:
 *                 type: string
 *               show:
 *                 type: boolean
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               category:
 *                 type: string
 *                 description: Id of the related category
 *               cover:
 *                 type: object
 *                 properties:
 *                   format:
 *                     type: string
 *                   data:
 *                     type: string
 *                     format: binary
 *             required:
 *               - title
 *               - summary
 *               - author
 *               - content
 *               - show
 *               - tags
 *     responses:
 *       200:
 *         description: A blog object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 blog:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     summary:
 *                       type: string
 *                     author:
 *                       type: string
 *                     content:
 *                       type: string
 *                     show:
 *                       type: boolean
 *                     tags:
 *                       type: array
 *                       items:
 *                         type: string
 *                     category:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                     cover:
 *                       type: string
 *                     createdAt:
 *                       type: number
 *                     updatedAt:
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
 *       400:
 *         description: The title is taken
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
panelBlogRouter.post('/', auth('admin'), addBlog)



/**
 * @swagger
 * /panel/blog/{blogId}:
 *   get:
 *     tags:
 *       - Blog | Panel
 *     summary: get a blog by id
 *     description: get a blog by id
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: blogId
 *         in: path
 *         required: true
 *         description: The ID of the blog
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A blog object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 blog:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     summary:
 *                       type: string
 *                     author:
 *                       type: string
 *                     content:
 *                       type: string
 *                     show:
 *                       type: boolean
 *                     tags:
 *                       type: array
 *                       items:
 *                         type: string
 *                     category:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                     cover:
 *                       type: string
 *                     createdAt:
 *                       type: number
 *                     updatedAt:
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
panelBlogRouter.get('/:blogId', auth('admin'), getBlog)



/**
 * @swagger
 * /panel/blog:
 *   get:
 *     tags:
 *       - Blog | Panel
 *     summary: Get list of blogs
 *     description: Get list of blogs
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: limit
 *         in: query
 *         schema:
 *           type: number
 *         description: The number of items to return
 *       - name: skip
 *         in: query
 *         schema:
 *           type: number
 *         description: The number of items to skip before starting to collect the results
 *       - name: sortBy
 *         in: query
 *         schema:
 *           type: string
 *           enum: ["title", "view", "author", "createdAt", "updatedAt"]
 *         description: The property to sort by
 *       - name: sortOrder
 *         in: query
 *         schema:
 *           type: string
 *           enum: ['asc', 'desc']
 *         description: The order to sort by
 *       - name: search
 *         in: query
 *         schema:
 *           type: string
 *         description: The expression to filter the results by
 *     responses:
 *       200:
 *         description: List of blog objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 blogs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       summary:
 *                         type: string
 *                       author:
 *                         type: string
 *                       content:
 *                         type: string
 *                       show:
 *                         type: boolean
 *                       tags:
 *                         type: array
 *                         items:
 *                           type: string
 *                       category:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                       cover:
 *                         type: string
 *                       createdAt:
 *                         type: number
 *                       updatedAt:
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
panelBlogRouter.get('/', auth('admin'), getBlogs)




/**
 * @swagger
 * /panel/blog/{blogId}:
 *   patch:
 *     tags:
 *       - Blog | Panel
 *     summary: Edit a blog by id
 *     description: Edit a blog by id
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: blogId
 *         in: path
 *         required: true
 *         description: The ID of the blog
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
 *                   title:
 *                     type: string
 *                   summary:
 *                     type: string
 *                   author:
 *                     type: string
 *                   content:
 *                     type: string
 *                   show:
 *                     type: boolean
 *                   tags:
 *                     type: array
 *                     items:
 *                       type: string
 *                   category:
 *                     type: string
 *                     description: Id of the related category
 *                   cover:
 *                     type: object
 *                     properties:
 *                       format:
 *                         type: string
 *                       data:
 *                         type: string
 *                         format: binary
 *     responses:
 *       200:
 *         description: A blog object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 blog:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     summary:
 *                       type: string
 *                     author:
 *                       type: string
 *                     content:
 *                       type: string
 *                     show:
 *                       type: boolean
 *                     tags:
 *                       type: array
 *                       items:
 *                         type: string
 *                     category:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                     cover:
 *                       type: string
 *                     createdAt:
 *                       type: number
 *                     updatedAt:
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
 *       400:
 *         description: Unique fields required or no changes received
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
panelBlogRouter.patch('/:blogId', auth('admin'), editBlog)



/**
 * @swagger
 * /panel/blog/delete:
 *   post:
 *     tags:
 *       - Blog | Panel
 *     summary: Delete blogs by id
 *     description: Delete blogs by id
 *     security:
 *       - adminBearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idList:
 *                 type: array
 *                 items:
 *                   type: string
 *             required:
 *               - idList
 *     responses:
 *       200:
 *         description: The blogs deleted.
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
panelBlogRouter.post('/delete', auth('admin'), deleteBlogs)



/**
 * @swagger
 * /panel/blog/tags/all:
 *   get:
 *     tags:
 *       - Blog | Panel
 *     summary: get list of used tags in blogs
 *     description: get list of used tags in blogs
 *     security:
 *       - adminBearerAuth: []
 *     responses:
 *       200:
 *         description: A list of tags.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: string
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
panelBlogRouter.get('/tags/all', auth('admin'), getTags)

//----------------------------------------------------



/**
 * @swagger
 * /website/blog/{blogId}:
 *   get:
 *     tags:
 *       - Blog | Website
 *     summary: get a blog by id
 *     description: get a blog by id
 *     parameters:
 *       - name: blogId
 *         in: path
 *         required: true
 *         description: The ID of the blog
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A blog object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 blog:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     summary:
 *                       type: string
 *                     author:
 *                       type: string
 *                     content:
 *                       type: string
 *                     show:
 *                       type: boolean
 *                     tags:
 *                       type: array
 *                       items:
 *                         type: string
 *                     category:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                     cover:
 *                       type: string
 *                     createdAt:
 *                       type: number
 *                     updatedAt:
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
websiteBlogRouter.get('/:blogId', getBlog)



/**
 * @swagger
 * /website/blog:
 *   get:
 *     tags:
 *       - Blog | Website
 *     summary: Get list of blogs
 *     description: Get list of blogs
 *     parameters:
 *       - name: limit
 *         in: query
 *         schema:
 *           type: number
 *         description: The number of items to return
 *       - name: skip
 *         in: query
 *         schema:
 *           type: number
 *         description: The number of items to skip before starting to collect the results
 *       - name: sortBy
 *         in: query
 *         schema:
 *           type: string
 *           enum: ["title", "view", "author", "createdAt", "updatedAt"]
 *         description: The property to sort by
 *       - name: sortOrder
 *         in: query
 *         schema:
 *           type: string
 *           enum: ['asc', 'desc']
 *         description: The order to sort by
 *       - name: search
 *         in: query
 *         schema:
 *           type: string
 *         description: The expression to filter title of the results by
 *     responses:
 *       200:
 *         description: List of blog objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 blogs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       summary:
 *                         type: string
 *                       author:
 *                         type: string
 *                       content:
 *                         type: string
 *                       show:
 *                         type: boolean
 *                       tags:
 *                         type: array
 *                         items:
 *                           type: string
 *                       category:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                       cover:
 *                         type: string
 *                       createdAt:
 *                         type: number
 *                       updatedAt:
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
websiteBlogRouter.get('/', getBlogs)



/**
 * @swagger
 * /website/blog/tag/{tagValue}:
 *   get:
 *     tags:
 *       - Blog | Website
 *     summary: Get list of blogs containing tag
 *     description: Get list of blogs containing the tag
 *     parameters:
 *       - name: tagValue
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The tag that blogs filter by
 *       - name: limit
 *         in: query
 *         schema:
 *           type: number
 *         description: The number of items to return
 *       - name: skip
 *         in: query
 *         schema:
 *           type: number
 *         description: The number of items to skip before starting to collect the results
 *       - name: sortBy
 *         in: query
 *         schema:
 *           type: string
 *           enum: ["title", "view", "author", "createdAt", "updatedAt"]
 *         description: The property to sort by
 *       - name: sortOrder
 *         in: query
 *         schema:
 *           type: string
 *           enum: ['asc', 'desc']
 *         description: The order to sort by
 *       - name: search
 *         in: query
 *         schema:
 *           type: string
 *         description: The expression to filter the results by
 *     responses:
 *       200:
 *         description: List of blog objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 blogs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       summary:
 *                         type: string
 *                       author:
 *                         type: string
 *                       content:
 *                         type: string
 *                       show:
 *                         type: boolean
 *                       tags:
 *                         type: array
 *                         items:
 *                           type: string
 *                       category:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                       cover:
 *                         type: string
 *                       createdAt:
 *                         type: number
 *                       updatedAt:
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
websiteBlogRouter.get('/tag/:tagValue', getBlogsByTag)