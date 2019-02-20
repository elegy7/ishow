import { ValueTransformer } from 'typeorm'

class ExcludeTransformer implements ValueTransformer {
    from(val) {
        return undefined
    }
    to(val) {
        return val
    }
}

export const ExcludeTrans = new ExcludeTransformer()
