import 'dotenv/config'
import fs from 'fs'
import { XMLParser } from 'fast-xml-parser'
import mime from 'mime'
import { getPayload } from 'payload'
import payloadConfig from '@payload-config'
import { generateLexicalContent } from '@/utilities/generateLexicalContent'
import { media } from '@/payload-generated-schema'

function buildName(display, firstname, lastname) {
  let name = ''
  if (firstname) {
    name += firstname
    if (lastname) {
      name += ' ' + lastname
    }
  } else {
    name += display
  }
  return name
}

;(async () => {
  console.log('Starting migration')

  const payload = await getPayload({ config: payloadConfig })

  const { docs: payloadUsersData } = await payload.find({
    collection: 'users',
  })

  const payloadUsers = new Set(payloadUsersData.map((user) => user.email))

  const xmlData = fs.readFileSync('src/wordpress/blogWPData.xml', 'utf8')

  // const wpData = parse(xmlData)
  const parser = new XMLParser()
  const wpData = parser.parse(xmlData)

  for (const authorItem of wpData.rss.channel['wp:author']) {
    console.log(authorItem['wp:author_email'])
    if (payloadUsers.has(authorItem['wp:author_email'].toLowerCase())) {
      await payload.update({
        collection: 'users',
        id: payloadUsersData.find(
          (doc) => doc.email === authorItem['wp:author_email'].toLowerCase(),
        ).id,
        data: {
          name: buildName(
            authorItem['wp:author_display_name'],
            authorItem['wp:author_first_name'],
            authorItem['wp:author_last_name'],
          ),
          author_login: authorItem['wp:author_login'],
        },
      })
      continue
    }
    await payload.create({
      collection: 'users',
      data: {
        email: authorItem['wp:author_email'],
        name: buildName(
          authorItem['wp:author_display_name'],
          authorItem['wp:author_first_name'],
          authorItem['wp:author_last_name'],
        ),
        author_login: authorItem['wp:author_login'],
        password: '0000',
      },
      locale: 'en',
    })
  }
  process.exit(0)
})()
