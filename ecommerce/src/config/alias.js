import moduleAlias from 'module-alias'
import path from 'path'

moduleAlias.addAlias('@', path.join(__dirname, '..'))
