import * as core from '@actions/core'
import {download, resolveVersion} from './download'
import {lint} from './veloctl'

async function run(): Promise<void> {
  try {
    const velocityToken = core.getInput('velocity-token')
    if (!velocityToken) {
      throw new Error('Missing velocity-token')
    }

    const fileName = core.getInput('file-name')
    if (!fileName) {
      throw new Error('Missing filename')
    }

    const cliVersion = await resolveVersion(core.getInput('version'))
    const veloctl = await download(cliVersion)
    core.debug(`veloctl available at: ${veloctl}`)

    try {
      await lint(velocityToken, fileName)
    } catch (e) {
      throw e
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
    throw error
  }
}

run()
