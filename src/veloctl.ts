import * as core from '@actions/core'
import {ExecOutput, getExecOutput} from '@actions/exec'

async function execVeloctl(token: string, args: string[]): Promise<ExecOutput> {
  const output = await getExecOutput('veloctl', args, {
    env: {
      VELOCITY_TOKEN: token,
      NO_COLOR: '1',
      ...process.env
    },
    ignoreReturnCode: true,
    silent: true
  })

  return output
}

export async function lint(token: string, fileName: string): Promise<boolean> {
  const args = ['env', 'create', '-f', fileName, '--dry-run']
  const output = await execVeloctl(token, args)

  if (output.exitCode !== 0) {
    throw new Error(
      `failed to lint (exitCode=${output.exitCode}, args=${args}): ${output.stdout}`
    )
  }

  await core.summary
    .addHeading('Lint output')
    .addCodeBlock(output.stdout, 'text')
    .write()
  return true
}
