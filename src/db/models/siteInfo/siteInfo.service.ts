import SiteInfo from "./siteInfo"
import imageService from "../image/image.service"
import { IResponse } from "../../../controllers/helper"
import { statusCodes, errorMessages, websiteName } from "../../../utils/constants"
import mongoose, { ObjectId as objectId } from "mongoose"
const ObjectId = mongoose.Types.ObjectId



//--------------------------------------------------------------------------------

const addAdvantage = async (
  newAdvantage: {
    englishTitle: string
    englishContent: string
    germanTitle: string
    germanContent: string
    icon: {
      format: string,
      data: Buffer
    }
  }
): Promise<IResponse> => {

  try {
    const { englishTitle, englishContent, germanTitle, germanContent, icon } = newAdvantage

    // checking english title availability
    const existingEnglishTitle = await SiteInfo.findOne({
      websiteName,
      'advantages.englishTitle': englishTitle,
    }).exec()

    if(existingEnglishTitle) {
      return {
        success: false,
        error: {
          message: errorMessages.siteInfo.englishTitleIsTaken,
          statusCode: statusCodes.badRequest
        }
      }
    }

    // checking german title availability
    const existingGermanTitle = await SiteInfo.findOne({
      websiteName,
      'advantages.germanTitle': germanTitle,
    }).exec()

    if(existingGermanTitle) {
      return {
        success: false,
        error: {
          message: errorMessages.siteInfo.germanTitleIsTaken,
          statusCode: statusCodes.badRequest
        }
      }
    }

    const iconResult = await imageService.storeImage(icon.format, icon.data)
    if(!iconResult.success) {
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
        advantages: {
          englishTitle,
          englishContent,
          germanTitle,
          germanContent,
          icon: iconResult.imageUrl
        }
      }
    }

    const updatedSiteInfo = await SiteInfo.findOneAndUpdate({ websiteName }, update, { new: true })

    const addedAdvantage = updatedSiteInfo?.advantages.find((advantage) => {
      return advantage.englishTitle == englishTitle
    })

    return {
      success: true,
      outputs: {
        advantage: addedAdvantage
      }
    }

  } catch(error) {
    console.log('Error while adding advantage: ', error)

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

const getAdvantage = async (advantageId: string): Promise<IResponse> => {
  try {
    const filter = {
      websiteName,
      'advantages._id': new ObjectId(advantageId)
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

    const advantage = siteInfo.advantages.find((advantage) => {
      return advantage._id.toString() == advantageId
    })

    return {
      success: true,
      outputs: {
        advantage
      }
    }

  } catch(error) {
    console.log('Error while getting advantage: ', error)

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

const getAdvantages = async (): Promise<IResponse> => {
  try {
    const siteInfo = await SiteInfo.findOne({ websiteName }).exec()

    return {
      success: true,
      outputs: {
        advantages: siteInfo?.advantages || [],
        count: (siteInfo?.advantages || []).length
      }
    }

  } catch(error) {
    console.log('Error while getting advantages: ', error)

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

const editAdvantage = async (
  advantageId: string,
  updates: {
    englishTitle?: string
    englishContent?: string
    germanTitle?: string
    germanContent?: string
    icon?: {
      format: string,
      data: Buffer
    } | string
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
      'advantages._id': new ObjectId(advantageId)
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

    if(updates.englishTitle) {
      // checking english title availability
      const filter = {
        websiteName,
        'advantages.englishTitle': updates.englishTitle
      }

      const existingAdvantage = await SiteInfo.findOne(filter).exec()

      if(existingAdvantage) {
        return {
          success: false,
          error: {
            message: errorMessages.siteInfo.englishTitleIsTaken,
            statusCode: statusCodes.badRequest
          }
        }
      }
    }

    if(updates.germanTitle) {
      // checking german title availability
      const filter = {
        websiteName,
        'advantages.germanTitle': updates.germanTitle
      }

      const existingAdvantage = await SiteInfo.findOne(filter).exec()

      if(existingAdvantage) {
        return {
          success: false,
          error: {
            message: errorMessages.siteInfo.germanTitleIsTaken,
            statusCode: statusCodes.badRequest
          }
        }
      }
    }

    if(updates.icon && typeof updates.icon != 'string') {
      // Deleting old icon
      const oldIcon = siteInfo?.advantages.find((advantage) => {
        return advantage._id.toString() == advantageId
      })?.icon
      
      if(oldIcon) {
        await imageService.deleteImage(oldIcon)
      }

      // Store new icon in database
      const result = await imageService.storeImage(updates.icon.format, updates.icon.data)

      if(!result.success) {
        return {
          success: false,
          error: {
            message: errorMessages.siteInfo.imageProblem,
            statusCode: statusCodes.ise
          }
        }
      }
      
      updates.icon = result.imageUrl
    }

    const update: { [key: string]: any} = {}

    const updatesValues = Object.values(updates)

    Object.keys(updates).forEach((u, i) => {
      update[`advantages.$[i].${u}`] = updatesValues[i]
    })
    const arrayFilters = [{'i._id': advantageId}]

    const updatedSiteInfo = await SiteInfo.findOneAndUpdate(filter, update, { arrayFilters, new: true }).exec()

    const updatedAdvantage = updatedSiteInfo?.advantages.find((advantage) => {
      return advantage._id.toString() == advantageId
    })

    return {
      success: true,
      outputs: {
        advantage: updatedAdvantage
      }
    }
  } catch(error) {
    console.log('Error while editing a advantage: ', error)

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

const deleteAdvantage = async (advantageId: string): Promise<IResponse> => {
  try {
    const filter = {
      websiteName,
      'advantages._id': new ObjectId(advantageId)
    }

    const update = {
      $pull: { advantages: { _id: new ObjectId(advantageId) }}
    }
    const siteInfo = await SiteInfo.findOneAndUpdate(filter, update).exec()

    const icon = siteInfo?.advantages.find((advantage) => {
      return advantage._id.toString() == advantageId
    })?.icon
    
    if(icon) {
      await imageService.deleteImage(icon)
    }

    return {
      success: true
    }

  } catch(error) {
    console.log('Error while deleting advantage: ', error)

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

const addService = async (
  newService: {
    englishTitle: string
    englishContent: string
    germanTitle: string
    germanContent: string
    icon: {
      format: string,
      data: Buffer
    }
    images: {
      format: string,
      data: Buffer
    }[]
  }
): Promise<IResponse> => {

  try {
    const { englishTitle, englishContent, germanTitle, germanContent, icon, images } = newService

    // checking english title availability
    const existingEnglishTitle = await SiteInfo.findOne({
      websiteName,
      'services.englishTitle': englishTitle,
    }).exec()

    if(existingEnglishTitle) {
      return {
        success: false,
        error: {
          message: errorMessages.siteInfo.englishTitleIsTaken,
          statusCode: statusCodes.badRequest
        }
      }
    }

    // checking german title availability
    const existingGermanTitle = await SiteInfo.findOne({
      websiteName,
      'services.germanTitle': germanTitle,
    }).exec()

    if(existingGermanTitle) {
      return {
        success: false,
        error: {
          message: errorMessages.siteInfo.germanTitleIsTaken,
          statusCode: statusCodes.badRequest
        }
      }
    }

    const iconResult = await imageService.storeImage(icon.format, icon.data)
    if(!iconResult.success) {
      return {
        success: false,
        error: {
          message: errorMessages.siteInfo.imageProblem,
          statusCode: statusCodes.ise
        }
      }
    }

    const imagesToSave: string[] = []

    for(const image of images) {
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
      imagesToSave.push(result.imageUrl)
    }

    const update = { 
      $push: { 
        services: {
          englishTitle,
          englishContent,
          germanTitle,
          germanContent,
          icon: iconResult.imageUrl,
          images: imagesToSave
        }
      }
    }

    const updatedSiteInfo = await SiteInfo.findOneAndUpdate({ websiteName }, update, { new: true })

    const addedService = updatedSiteInfo?.services.find((service) => {
      return service.englishTitle == englishTitle
    })

    return {
      success: true,
      outputs: {
        service: addedService
      }
    }

  } catch(error) {
    console.log('Error while adding service: ', error)

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

const getService = async (serviceId: string): Promise<IResponse> => {
  try {
    const filter = {
      websiteName,
      'services._id': new ObjectId(serviceId)
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

    const service = siteInfo.services.find((service) => {
      return service._id.toString() == serviceId
    })

    return {
      success: true,
      outputs: {
        service
      }
    }

  } catch(error) {
    console.log('Error while getting service: ', error)

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

const getServices = async (): Promise<IResponse> => {
  try {
    const siteInfo = await SiteInfo.findOne({ websiteName }).exec()

    return {
      success: true,
      outputs: {
        services: siteInfo?.services || [],
        count: (siteInfo?.services || []).length
      }
    }

  } catch(error) {
    console.log('Error while getting services: ', error)

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

const editService = async (
  serviceId: string,
  updates: {
    englishTitle?: string
    englishContent?: string
    germanTitle?: string
    germanContent?: string
    icon?: {
      format: string,
      data: Buffer
    } | string
    images?: {
      format: string,
      data: Buffer
    }[] | string[]
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
      'services._id': new ObjectId(serviceId)
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

    if(updates.englishTitle) {
      // checking english title availability
      const filter = {
        websiteName,
        'services.englishTitle': updates.englishTitle
      }

      const existingService = await SiteInfo.findOne(filter).exec()

      if(existingService) {
        return {
          success: false,
          error: {
            message: errorMessages.siteInfo.englishTitleIsTaken,
            statusCode: statusCodes.badRequest
          }
        }
      }
    }

    if(updates.germanTitle) {
      // checking german title availability
      const filter = {
        websiteName,
        'services.germanTitle': updates.germanTitle
      }

      const existingService = await SiteInfo.findOne(filter).exec()

      if(existingService) {
        return {
          success: false,
          error: {
            message: errorMessages.siteInfo.germanTitleIsTaken,
            statusCode: statusCodes.badRequest
          }
        }
      }
    }

    if(updates.icon && typeof updates.icon != 'string') {
      // Deleting old icon
      const oldIcon = siteInfo?.services.find((service) => {
        return service._id.toString() == serviceId
      })?.icon
      
      if(oldIcon) {
        await imageService.deleteImage(oldIcon)
      }

      // Store new icon in database

      const result = await imageService.storeImage(updates.icon.format, updates.icon.data)

      if(!result.success) {
        return {
          success: false,
          error: {
            message: errorMessages.siteInfo.imageProblem,
            statusCode: statusCodes.ise
          }
        }
      }
      
      updates.icon = result.imageUrl
    }

    if(updates.images) {
      // Deleting old images
      const oldImages = siteInfo?.services.find((service) => {
        return service._id.toString() == serviceId
      })?.images || []
      
      for(const image of oldImages) {
        await imageService.deleteImage(image)
      }

      // Store new images in database
      const imagesToSave: string[] = []

      for(const image of updates.images) {
        if(typeof image == 'string') continue

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
        imagesToSave.push(result.imageUrl)
      }

      updates.images = imagesToSave
    }

    const update: { [key: string]: any} = {}

    const updatesValues = Object.values(updates)

    Object.keys(updates).forEach((u, i) => {
      update[`services.$[i].${u}`] = updatesValues[i]
    })
    const arrayFilters = [{'i._id': serviceId}]

    const updatedSiteInfo = await SiteInfo.findOneAndUpdate(filter, update, { arrayFilters, new: true }).exec()

    const updatedService = updatedSiteInfo?.services.find((service) => {
      return service._id.toString() == serviceId
    })

    return {
      success: true,
      outputs: {
        service: updatedService
      }
    }
  } catch(error) {
    console.log('Error while editing a service: ', error)

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

const deleteService = async (serviceId: string): Promise<IResponse> => {
  try {
    const filter = {
      websiteName,
      'services._id': new ObjectId(serviceId)
    }

    const update = {
      $pull: { services: { _id: new ObjectId(serviceId) }}
    }
    const siteInfo = await SiteInfo.findOneAndUpdate(filter, update).exec()

    const images = siteInfo?.services.find((service) => {
      return service._id.toString() == serviceId
    })?.images || []
    
    for(const image of images) {
      await imageService.deleteImage(image)
    }

    return {
      success: true
    }

  } catch(error) {
    console.log('Error while deleting service: ', error)

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

const addMember = async (
  newMember: {
    englishName: string
    englishRole: string
    germanName: string
    germanRole: string
    images: {
      format: string,
      data: Buffer
    }[]
  }
): Promise<IResponse> => {

  try {
    const { englishName, englishRole, germanName, germanRole, images } = newMember

    // checking english name availability
    const existingEnglishName = await SiteInfo.findOne({
      websiteName,
      'members.englishName': englishName,
    }).exec()

    if(existingEnglishName) {
      return {
        success: false,
        error: {
          message: errorMessages.siteInfo.englishNameIsTaken,
          statusCode: statusCodes.badRequest
        }
      }
    }

    // checking german name availability
    const existingGermanName = await SiteInfo.findOne({
      websiteName,
      'members.germanName': germanName,
    }).exec()

    if(existingGermanName) {
      return {
        success: false,
        error: {
          message: errorMessages.siteInfo.germanNameIsTaken,
          statusCode: statusCodes.badRequest
        }
      }
    }

    const imagesToSave: string[] = []

    for(const image of images) {
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
      imagesToSave.push(result.imageUrl)
    }

    const update = { 
      $push: { 
        members: {
          englishName,
          englishRole,
          germanName,
          germanRole,
          images: imagesToSave
        }
      }
    }

    const updatedSiteInfo = await SiteInfo.findOneAndUpdate({ websiteName }, update, { new: true })

    const addedMember = updatedSiteInfo?.members.find((member) => {
      return member.englishName == englishName
    })

    return {
      success: true,
      outputs: {
        member: addedMember
      }
    }

  } catch(error) {
    console.log('Error while adding member: ', error)

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

const getMember = async (memberId: string): Promise<IResponse> => {
  try {
    const filter = {
      websiteName,
      'members._id': new ObjectId(memberId)
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

    const member = siteInfo.members.find((member) => {
      return member._id.toString() == memberId
    })

    return {
      success: true,
      outputs: {
        member
      }
    }

  } catch(error) {
    console.log('Error while getting member: ', error)

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

const getMembers = async (): Promise<IResponse> => {
  try {
    const siteInfo = await SiteInfo.findOne({ websiteName }).exec()

    return {
      success: true,
      outputs: {
        members: siteInfo?.members || [],
        count: (siteInfo?.members || []).length
      }
    }

  } catch(error) {
    console.log('Error while getting members: ', error)

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

const editMember = async (
  memberId: string,
  updates: {
    englishName?: string
    englishRole?: string
    germanName?: string
    germanRole?: string
    images?: {
      format: string,
      data: Buffer
    }[] | string[]
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
      'members._id': new ObjectId(memberId)
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

    if(updates.englishName) {
      // checking english name availability
      const filter = {
        websiteName,
        'members.englishName': updates.englishName
      }

      const existingMember = await SiteInfo.findOne(filter).exec()

      if(existingMember) {
        return {
          success: false,
          error: {
            message: errorMessages.siteInfo.englishNameIsTaken,
            statusCode: statusCodes.badRequest
          }
        }
      }
    }

    if(updates.germanName) {
      // checking german name availability
      const filter = {
        websiteName,
        'members.germanName': updates.germanName
      }

      const existingMember = await SiteInfo.findOne(filter).exec()

      if(existingMember) {
        return {
          success: false,
          error: {
            message: errorMessages.siteInfo.germanNameIsTaken,
            statusCode: statusCodes.badRequest
          }
        }
      }
    }

    if(updates.images) {
      // Deleting old images
      const oldImages = siteInfo?.members.find((member) => {
        return member._id.toString() == memberId
      })?.images || []
      
      for(const image of oldImages) {
        await imageService.deleteImage(image)
      }

      // Store new images in database
      const imagesToSave: string[] = []

      for(const image of updates.images) {
        if(typeof image == 'string') continue

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
        imagesToSave.push(result.imageUrl)
      }

      updates.images = imagesToSave
    }

    const update: { [key: string]: any} = {}

    const updatesValues = Object.values(updates)

    Object.keys(updates).forEach((u, i) => {
      update[`members.$[i].${u}`] = updatesValues[i]
    })
    const arrayFilters = [{'i._id': memberId}]

    const updatedSiteInfo = await SiteInfo.findOneAndUpdate(filter, update, { arrayFilters, new: true }).exec()

    const updatedMember = updatedSiteInfo?.members.find((member) => {
      return member._id.toString() == memberId
    })

    return {
      success: true,
      outputs: {
        member: updatedMember
      }
    }
  } catch(error) {
    console.log('Error while editing a member: ', error)

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

const deleteMember = async (memberId: string): Promise<IResponse> => {
  try {
    const filter = {
      websiteName,
      'members._id': new ObjectId(memberId)
    }

    const update = {
      $pull: { members: { _id: new ObjectId(memberId) }}
    }
    const siteInfo = await SiteInfo.findOneAndUpdate(filter, update).exec()

    const images = siteInfo?.members.find((member) => {
      return member._id.toString() == memberId
    })?.images || []
    
    for(const image of images) {
      await imageService.deleteImage(image)
    }

    return {
      success: true
    }

  } catch(error) {
    console.log('Error while deleting member: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}//--------------------------------------------------------------------------------

const addSatisfaction = async (
  newSatisfaction: {
    englishTitle: string
    englishContent: string
    germanTitle: string
    germanContent: string
    images: {
      format: string,
      data: Buffer
    }[]
  }
): Promise<IResponse> => {

  try {
    const { englishTitle, englishContent, germanTitle, germanContent, images } = newSatisfaction

    // checking english title availability
    const existingSatisfactionWithSameEnglishTitle = await SiteInfo.findOne({
      websiteName,
      'satisfactions.englishTitle': englishTitle,
    }).exec()

    if(existingSatisfactionWithSameEnglishTitle) {
      return {
        success: false,
        error: {
          message: errorMessages.siteInfo.englishTitleIsTaken,
          statusCode: statusCodes.badRequest
        }
      }
    }

    // checking german title availability
    const existingSatisfactionWithSameGermanTitle = await SiteInfo.findOne({
      websiteName,
      'satisfactions.germanTitle': germanTitle,
    }).exec()

    if(existingSatisfactionWithSameGermanTitle) {
      return {
        success: false,
        error: {
          message: errorMessages.siteInfo.germanTitleIsTaken,
          statusCode: statusCodes.badRequest
        }
      }
    }

    const imagesToSave: string[] = []

    for(const image of images) {
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
      imagesToSave.push(result.imageUrl)
    }

    const update = { 
      $push: { 
        'satisfactions': {
          englishTitle,
          englishContent,
          germanTitle,
          germanContent,
          images: imagesToSave
        }
      }
    }

    const updatedSiteInfo = await SiteInfo.findOneAndUpdate({ websiteName }, update, { new: true })

    const addedSatisfaction = updatedSiteInfo?.satisfactions.find((satisfaction) => {
      return satisfaction.englishTitle == englishTitle
    })

    return {
      success: true,
      outputs: {
        satisfaction: addedSatisfaction
      }
    }

  } catch(error) {
    console.log('Error while adding satisfaction: ', error)

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

const getSatisfaction = async (satisfactionId: string): Promise<IResponse> => {
  try {
    const filter = {
      websiteName,
      'satisfactions._id': new ObjectId(satisfactionId)
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

    const satisfaction = siteInfo.satisfactions.find((satisfaction) => {
      return satisfaction._id.toString() == satisfactionId
    })

    return {
      success: true,
      outputs: {
        satisfaction
      }
    }

  } catch(error) {
    console.log('Error while getting satisfaction: ', error)

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

const getSatisfactions = async (): Promise<IResponse> => {
  try {
    const siteInfo = await SiteInfo.findOne({ websiteName }).exec()

    return {
      success: true,
      outputs: {
        satisfactions: siteInfo?.satisfactions || [],
        count: (siteInfo?.satisfactions || []).length
      }
    }

  } catch(error) {
    console.log('Error while getting satisfactions: ', error)

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

const editSatisfaction = async (
  satisfactionId: string,
  updates: {
    englishTitle?: string
    englishContent?: string
    germanTitle?: string
    germanContent?: string
    images?: {
      format: string,
      data: Buffer
    }[] | string[]
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
      'satisfactions._id': new ObjectId(satisfactionId)
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

    if(updates.englishTitle) {
      // checking english title availability
      const filter = {
        websiteName,
        'satisfactions.englishTitle': updates.englishTitle
      }

      const existingSatisfaction = await SiteInfo.findOne(filter).exec()

      if(existingSatisfaction) {
        return {
          success: false,
          error: {
            message: errorMessages.siteInfo.englishTitleIsTaken,
            statusCode: statusCodes.badRequest
          }
        }
      }
    }

    if(updates.germanTitle) {
      // checking german title availability
      const filter = {
        websiteName,
        'satisfactions.germanTitle': updates.germanTitle
      }

      const existingSatisfaction = await SiteInfo.findOne(filter).exec()

      if(existingSatisfaction) {
        return {
          success: false,
          error: {
            message: errorMessages.siteInfo.germanTitleIsTaken,
            statusCode: statusCodes.badRequest
          }
        }
      }
    }

    if(updates.images) {
      // Deleting old images
      const oldImages = siteInfo?.satisfactions.find((satisfaction) => {
        return satisfaction._id.toString() == satisfactionId
      })?.images || []
      
      for(const image of oldImages) {
        await imageService.deleteImage(image)
      }

      // Store new images in database
      const imagesToSave: string[] = []

      for(const image of updates.images) {
        if(typeof image == 'string') continue

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
        imagesToSave.push(result.imageUrl)
      }

      updates.images = imagesToSave
    }

    const update: { [key: string]: any} = {}

    const updatesValues = Object.values(updates)

    Object.keys(updates).forEach((u, i) => {
      update[`satisfactions.$[i].${u}`] = updatesValues[i]
    })
    const arrayFilters = [{'i._id': satisfactionId}]

    const updatedSiteInfo = await SiteInfo.findOneAndUpdate(filter, update, { arrayFilters, new: true }).exec()

    const updatedSatisfaction = updatedSiteInfo?.satisfactions.find((satisfaction) => {
      return satisfaction._id.toString() == satisfactionId
    })

    return {
      success: true,
      outputs: {
        satisfaction: updatedSatisfaction
      }
    }
  } catch(error) {
    console.log('Error while editing a satisfaction: ', error)

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

const deleteSatisfaction = async (satisfactionId: string): Promise<IResponse> => {
  try {
    const filter = {
      websiteName,
      'satisfactions._id': new ObjectId(satisfactionId)
    }

    const update = {
      $pull: { satisfactions: { _id: new ObjectId(satisfactionId) }}
    }
    const siteInfo = await SiteInfo.findOneAndUpdate(filter, update).exec()

    const images = siteInfo?.satisfactions.find((satisfaction) => {
      return satisfaction._id.toString() == satisfactionId
    })?.images || []
    
    for(const image of images) {
      await imageService.deleteImage(image)
    }

    return {
      success: true
    }

  } catch(error) {
    console.log('Error while deleting satisfaction: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}




export default {
  addAdvantage,
  getAdvantage,
  getAdvantages,
  editAdvantage,
  deleteAdvantage,
  addService,
  getService,
  getServices,
  editService,
  deleteService,
  addMember,
  getMember,
  getMembers,
  editMember,
  deleteMember,
  addSatisfaction,
  getSatisfaction,
  getSatisfactions,
  editSatisfaction,
  deleteSatisfaction,
}