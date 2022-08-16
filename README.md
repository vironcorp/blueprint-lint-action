# blueprint-lint-action

This is a GitHub Action to lint and verify a blueprint for [Velocity](https://velocity.tech/).

## Examples

Incorporate the following action in your workflow to verify your blueprint changes are valid in Velocity using an authentication token (can be obtained from your organization's account manager), and the blueprint file:

```yml
steps:
  - name: Check out repository code
    uses: actions/checkout@v2
  - name: Generate the blueprint
    run: |
      helm template my-release chart/ > blueprint.yaml
      for i in $(ls kubernetes/*.yaml); do echo "---"; cat $i; done | tail -n +2 > blueprint.yaml
  - uses: techvelocity/blueprint-lint-action@v1
    with:
      velocity-token: ${{ secrets.VELOCITY_TOKEN }}
      file-name: blueprint.yaml
```

or via raw Kubernetes files:

```yml
steps:
  - name: Check out repository code
    uses: actions/checkout@v2
  - name: Generate the blueprint
    run: |
      for i in $(ls kubernetes/*.yaml); do echo "---"; cat $i; done | tail -n +2 > blueprint.yaml
  - uses: techvelocity/blueprint-lint-action@v1
    with:
      velocity-token: ${{ secrets.VELOCITY_TOKEN }}
      file-name: blueprint.yaml
```

## Inputs

The following inputs are mandatory:

| Name             | Description                                                                                                    |
| ---------------- | -------------------------------------------------------------------------------------------------------------- |
| `velocity-token` | Velocity's authentication token. It is strongly recommended that this value be retrieved from a GitHub secret. |
| `file-name`      | The filename containing the blueprint.                                                                         |

The following inputs are optional:

| Name      | Description                                    | Default  |
| --------- | ---------------------------------------------- | -------- |
| `version` | Select a specific version of `veloctl` to use. | `latest` |
