import React, { Fragment } from "react";

export function Table({ rows }) {
  return (
    <div className="tableview">
      <table className="border">
        <thead>
          <tr>
            {rows[0].cells.map((d) => (
              <th key={d} className="border p-1">
                {d}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(({ cells, _key }, i) =>
            i == 0 || i == rows.length - 1 ? (
              <Fragment key={_key}></Fragment>
            ) : (
              <tr key={_key} className="border text-center">
                {cells.map((d) => (
                  <td key={d} className="border p-1">
                    {d}
                  </td>
                ))}
              </tr>
            ),
          )}
        </tbody>
        <tfoot>
          <tr>
            {rows[rows.length - 1].cells.map((d) => (
              <td key={d} className="border p-1">
                {d}
              </td>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
