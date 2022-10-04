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
  sliderHeader: {
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
  aboutUs: {
    images: string[]
    englishTitle: string
    englishContent: string
    germanTitle: string
    germanContent: string
  }
  numbersAndStats: {
    _id: objectId
    icon: string
    number: number
    englishContent: string
    germanContent: string
  }[]
  whyChooseUs: {
    _id: objectId
    icon: string
    englishTitle: string
    englishContent: string
    germanTitle: string
    germanContent: string
  }[]
  services: {
    _id: objectId
    icon: string
    images: string[]
    englishTitle: string
    englishContent: string
    germanTitle: string
    germanContent: string
  }[]
  ourTeam: {
    _id: objectId
    images: string[]
    englishName: string
    englishRole: string
    germanName: string
    germanRole: string
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
  customersSatisfaction: {
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
  sliderHeader: [{
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
  aboutUs: {
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
  numbersAndStats: [{
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
  whyChooseUs: [{
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
  services: [{
    icon: { // This is going to be url of a stored image
      type: String
    },
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
  }],
  ourTeam: [{
    images: [{ // This is going to be url of a stored image
      type: String
    }],
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
    }
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
  customersSatisfaction: [{
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
