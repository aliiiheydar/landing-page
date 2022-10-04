import SiteInfo from "./siteInfo"
import imageService from "../image/image.service"
import { IResponse } from "../../../controllers/helper"
import { statusCodes, errorMessages, websiteName } from "../../../utils/constants"
import mongoose, { ObjectId as objectId } from "mongoose"
const ObjectId = mongoose.Types.ObjectId

const updateLogo = async (
  logo: { 
    format: string,
    data: Buffer
  }
): Promise<IResponse> => {
  try {

    const result = await imageService.storeImage(logo.format, logo.data)

    if(!result.success) {
      return {
        success: false,
        error: {
          message: errorMessages.shared.ise,
          statusCode: statusCodes.ise
        }
      }
    }

    const update = { 
      $set: { 
        'logo': result.imageUrl 
      }
    }

    const updatedSiteInfo = await SiteInfo.findOneAndUpdate({ websiteName }, update, { new: true })

    return {
      success: true,
      outputs: {
        logo: updatedSiteInfo?.logo
      }
    }

  } catch(error) {
    console.log('Error while updating site logo: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

//--------------------------------------------------------------------------------

const getLogo = async (): Promise<IResponse> => {
  try {
    const siteInfo = await SiteInfo.findOne({ websiteName }).exec()

    if(!siteInfo?.logo) {
      return {
        success: false,
        error: {
          message: errorMessages.shared.notFound,
          statusCode: statusCodes.notFound
        }
      }
    }

    return {
      success: true,
      outputs: {
        logo: siteInfo?.logo
      }
    }

  } catch(error) {
    console.log('Error while getting site logo: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

//--------------------------------------------------------------------------------

const addSocialNetwork = async (
  newSocialNetwork: {
    title: string,
    description: string,
    image: {
      format: string,
      data: Buffer
    }
  }
): Promise<IResponse> => {

  try {
    const { title, description, image } = newSocialNetwork

    // checking title availability
    const filter = {
      websiteName,
      'aboutUs.SocialNetworks.title': title
    }

    const existingSocialNetwork = await SiteInfo.findOne(filter).exec()

    if(existingSocialNetwork) {
      return {
        success: false,
        error: {
          message: errorMessages.siteInfo.titleIsTaken,
          statusCode: statusCodes.badRequest
        }
      }
    }

    const result = await imageService.storeImage(image.format, image.data)

    if(!result.success) {
      return {
        success: false,
        error: {
          message: errorMessages.siteInfo.imageProblem,
          statusCode: statusCodes.ise
        }
      }
    }

    const update = { 
      $push: { 
        'aboutUs.SocialNetworks': {
          title,
          description,
          image: result.imageUrl
        }
      }
    }

    const updatedSiteInfo = await SiteInfo.findOneAndUpdate({ websiteName }, update, { new: true })

    const addedSocialNetwork = updatedSiteInfo?.aboutUs.SocialNetworks.find((SocialNetwork) => {
      return SocialNetwork.title == title
    })

    return {
      success: true,
      outputs: {
        SocialNetwork: addedSocialNetwork
      }
    }

  } catch(error) {
    console.log('Error while adding SocialNetwork: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

//--------------------------------------------------------------------------------

const getSocialNetwork = async (SocialNetworkId: string): Promise<IResponse> => {
  try {
    const filter = {
      websiteName,
      'aboutUs.SocialNetworks._id': new ObjectId(SocialNetworkId)
    }
    const siteInfo = await SiteInfo.findOne(filter).exec()

    if(!siteInfo) {
      return {
        success: false,
        error: {
          message: errorMessages.shared.notFound,
          statusCode: statusCodes.notFound
        }
      }
    }

    const SocialNetwork = siteInfo.aboutUs.SocialNetworks.find((SocialNetwork) => {
      return SocialNetwork._id.toString() == SocialNetworkId
    })

    return {
      success: true,
      outputs: {
        SocialNetwork
      }
    }

  } catch(error) {
    console.log('Error while getting SocialNetwork: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

//--------------------------------------------------------------------------------

const getSocialNetworks = async (
  options: {
    limit?: number,
    skip?: number,
    sortBy?: string,
    sortOrder?: string,
    search?: string
  }
): Promise<IResponse> => {

  try {
    const { limit, skip, sortBy, sortOrder, search } = options

    const siteInfo = await SiteInfo.findOne({ websiteName }).exec()

    let SocialNetworks = siteInfo?.aboutUs.SocialNetworks || []

    // Sort SocialNetworks
    if(sortBy) {
      // This is for ts type error
      // Because of yup validation sortBy always has a valid value
      if(sortBy == 'title' || sortBy == 'createdAt') {
        SocialNetworks.sort((a, b) => {
          if(a[sortBy] > b[sortBy]) {
            return sortOrder == 'desc' ? -1 : 1
  
          } else if(a[sortBy] < b[sortBy]) {
            return sortOrder == 'desc' ? 1 : -1
  
          } else {
            return 0
          }
        })
      }
    }

    if(search) {
      SocialNetworks = SocialNetworks.filter((SocialNetwork) => {
        return SocialNetwork.title.includes(search)
      })
    }

    const count = SocialNetworks.length

    if(skip) {
      SocialNetworks = SocialNetworks.slice(skip)
    }

    if(limit) {
      SocialNetworks = SocialNetworks.slice(0, limit)
    }
    
    return {
      success: true,
      outputs: {
        SocialNetworks,
        count
      }
    }

  } catch(error) {
    console.log('Error while getting SocialNetworks: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

//--------------------------------------------------------------------------------

const editSocialNetwork = async (
  SocialNetworkId: string,
  updates: {
    title?: string
    description?: string
    image?: {
      format: string
      data: Buffer
    }
  }
): Promise<IResponse> => {

  try {

    if(Object.keys(updates).length == 0) {
      return {
        success: false,
        error: {
          message: errorMessages.shared.noChanges,
          statusCode: statusCodes.badRequest
        }
      }
    }

    const filter = {
      websiteName,
      'aboutUs.SocialNetworks._id': new ObjectId(SocialNetworkId)
    }

    const siteInfo = await SiteInfo.findOne(filter).exec()

    if(!siteInfo) {
      return {
        success: false,
        error: {
          message: errorMessages.shared.notFound,
          statusCode: statusCodes.notFound
        }
      }
    }

    if(updates.title) {
      // checking step availability

      const filter = {
        websiteName,
        'aboutUs.SocialNetworks.title': updates.title
      }

      const existingSocialNetwork = await SiteInfo.findOne(filter).exec()

      if(existingSocialNetwork) {
        return {
          success: false,
          error: {
            message: errorMessages.siteInfo.titleIsTaken,
            statusCode: statusCodes.badRequest
          }
        }
      }
    }

    // Store new image in database
    if(updates.image) {
      const imageUrl = siteInfo.aboutUs.SocialNetworks.find((SocialNetwork) => {
        return SocialNetwork._id.toString() == SocialNetworkId
      })?.image

      if(imageUrl) {
        await imageService.updateImage(imageUrl, updates.image.format, updates.image.data)
      }

      delete updates.image
    }

    const update: { [key: string]: any} = {}

    const updatesValues = Object.values(updates)

    Object.keys(updates).forEach((u, i) => {
      update[`aboutUs.SocialNetworks.$[i].${u}`] = updatesValues[i]
    })
    const arrayFilters = [{'i._id': SocialNetworkId}]

    const updatedSiteInfo = await SiteInfo.findOneAndUpdate(filter, update, { arrayFilters, new: true }).exec()

    const updatedSocialNetwork = updatedSiteInfo?.aboutUs.SocialNetworks.find((SocialNetwork) => {
      return SocialNetwork._id.toString() == SocialNetworkId
    })

    return {
      success: true,
      outputs: {
        SocialNetwork: updatedSocialNetwork
      }
    }
  } catch(error) {
    console.log('Error while editing a SocialNetwork: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

//--------------------------------------------------------------------------------

const deleteSocialNetworks = async (idList: string[]): Promise<IResponse> => {
  try {

    // deleting SocialNetworks and their image
    for(const id of idList) {
      const update = {
        $pull: {
          'aboutUs.SocialNetworks': {
            _id: new ObjectId(id)
          }
        }
      }
      const siteInfo = await SiteInfo.findOneAndUpdate({ websiteName }, update)

      const deletedSocialNetwork = siteInfo?.aboutUs.SocialNetworks.find((SocialNetwork) => {
        return SocialNetwork._id.toString() == id
      })

      if(deletedSocialNetwork) {
        await imageService.deleteImage(deletedSocialNetwork.image)
      }
    }

    return {
      success: true
    }
  } catch(error) {
    console.log('Error while deleting SocialNetworks: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}