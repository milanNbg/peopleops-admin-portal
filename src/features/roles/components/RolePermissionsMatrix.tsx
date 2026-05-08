import type {
  RolePermissionLevel,
  RolePermissionsMatrix as RolePermissionsMatrixData,
} from '@/types/role'

type RolePermissionsMatrixProps = {
  matrix: RolePermissionsMatrixData
}

const accessClassNames: Record<RolePermissionLevel, string> = {
  Full: 'full',
  Manage: 'manage',
  None: 'none',
  View: 'view',
}

export const RolePermissionsMatrix = ({
  matrix,
}: RolePermissionsMatrixProps) => (
  <div className="role-permissions-matrix-wrap">
    <table className="role-permissions-matrix">
      <caption className="visually-hidden">
        Role permissions matrix
      </caption>
      <thead>
        <tr>
          <th scope="col">Permission</th>
          {matrix.roles.map((role) => (
            <th key={role.id} scope="col">
              {role.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {matrix.rows.map((row) => {
          const permission = matrix.permissions.find(
            (item) => item.id === row.permissionId,
          )

          if (!permission) {
            return null
          }

          return (
            <tr key={row.permissionId}>
              <th scope="row">
                <span>{permission.label}</span>
                <small>{permission.description}</small>
              </th>
              {matrix.roles.map((role) => {
                const accessLevel = row.roleAccess[role.id] ?? 'None'

                return (
                  <td key={role.id}>
                    <span
                      className={`permission-level permission-level-${
                        accessClassNames[accessLevel]
                      }`}
                    >
                      {accessLevel}
                    </span>
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  </div>
)
