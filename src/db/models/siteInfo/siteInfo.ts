import mongoose, { Schema, Document, ObjectId as objectId } from "mongoose"

const ObjectId = mongoose.Types.ObjectId

export interface ISiteInfo extends Document {
  websiteName: string
  logo: string
  socialNetworks: {
    _id: objectId
    name: string
    link: string
    show: boolean
    icon: string
    createdAt: number
  }[]
  sliderHeaders: {
    icon: string
    englishTitle: string
    englishSubheader: string
    englishContent: string
    germanTitle: string
    germanSubheader: string
    germanContent: string
  }[]
  properties: {
    _id: objectId
    icon: string
    englishTitle: string
    englishContent: string
    germanTitle: string
    germanContent: string
  }[]
  aboutUsInfo: {
    images: string[]
    englishTitle: string
    englishContent: string
    germanTitle: string
    germanContent: string
  }
  numbers: {
    _id: objectId
    icon: string
    number: number
    englishContent: string
    germanContent: string
  }[]
  advantages: {
    _id: objectId
    englishTitle: string
    englishContent: string
    germanTitle: string
    germanContent: string
    icon: string
  }[]
  services: {
    _id: objectId
    englishTitle: string
    englishContent: string
    germanTitle: string
    germanContent: string
    icon: string
    images: string[]
  }[]
  members: {
    _id: objectId
    englishName: string
    englishRole: string
    germanName: string
    germanRole: string
    images: string[]
  }[]
  banner: {
    englishTitle: string
    germanTitle: string
  }
  footer: {
    email: string
    phone: string
    englishAddress: string
    germanAddress: string
    englishContent: string
    germanContent: string
    images: string[]
  }
  satisfactions: {
    _id: objectId
    images: string[]
    englishTitle: string
    englishContent: string
    germanTitle: string
    germanContent: string
  }[]
}

const siteInfoSchema = new Schema<ISiteInfo>({
  websiteName: {
    type: String,
    required: true
  },
  logo: { //This is going to be a url of a stored image
    type: String
  },
  socialNetworks: [{
    name: {
      type: String
    },
    link: {
      type: String
    },
    show: {
      type: Boolean
    },
    icon: { //This is going to be a url of a stored image
      type: String
    },
    createdAt: {
      type: Number,
      default: () => Math.floor(Date.now() / 1000)
    }
  }],
  sliderHeaders: [{
    icon: { // This is going to be url of a stored image
      type: String
    },
    englishTitle: {
      type: String
    },
    englishSubheader: {
      type: String
    },
    englishContent: {
      type: String
    },
    germanTitle: {
      type: String
    },
    germanSubheader: {
      type: String
    },
    germanContent: {
      type: String
    }
  }],
  properties: [{
    icon: { // This is going to be url of a stored image
      type: String
    },
    englishTitle: {
      type: String
    },
    englishContent: {
      type: String
    },
    germanTitle: {
      type: String
    },
    germanContent: {
      type: String
    }
  }],
  aboutUsInfo: {
    images: [{ // This is going to be url of a stored image
      type: String
    }],
    englishTitle: {
      type: String
    },
    englishContent: {
      type: String
    },
    germanTitle: {
      type: String
    },
    germanContent: {
      type: String
    }
  },
  numbers: [{
    icon: { // This is going to be url of a stored image
      type: String
    },
    number: {
      type: Number,
      default: 0
    },
    englishContent: {
      type: String
    },
    germanContent: {
      type: String
    }
  }],
  advantages: [{
    englishTitle: {
      type: String
    },
    englishContent: {
      type: String
    },
    germanTitle: {
      type: String
    },
    germanContent: {
      type: String
    },
    icon: { // This is going to be url of a stored image
      type: String
    },
  }],
  services: [{
    englishTitle: {
      type: String
    },
    englishContent: {
      type: String
    },
    germanTitle: {
      type: String
    },
    germanContent: {
      type: String
    },
    icon: { // This is going to be url of a stored image
      type: String
    },
    images: [{ // This is going to be url of a stored image
      type: String
    }],
  }],
  members: [{
    englishName: {
      type: String
    },
    englishRole: {
      type: String
    },
    germanName: {
      type: String
    },
    germanRole: {
      type: String
    },
    images: [{ // This is going to be url of a stored image
      type: String
    }]
  }],
  banner: {
    englishTitle: {
      type: String
    },
    germanTitle: {
      type: String
    },
  },
  footer: {
    email: {
      type: String
    },
    phone: {
      type: String
    },
    englishAddress: {
      type: String
    },
    germanAddress: {
      type: String
    },
    englishContent: {
      type: String
    },
    germanContent: {
      type: String
    },
    images: [{ // This is going to be url of a stored image
      type: String
    }]
  },
  satisfactions: [{
    images: [{ // This is going to be url of a stored image
      type: String
    }],
    englishTitle: {
      type: String
    },
    englishContent: {
      type: String
    },
    germanTitle: {
      type: String
    },
    germanContent: {
      type: String
    }
  }]
})

const siteInfo = mongoose.model<ISiteInfo>("SiteInfo", siteInfoSchema)

export default siteInfo
