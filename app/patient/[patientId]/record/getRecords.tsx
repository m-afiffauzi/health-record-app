import useSWR from "swr";
import EditRecord from "./editRecord";
import DeleteRecord from "./deleteRecord";

export default function GetRecords({ id }: any) {
  const { data, error } = useSWR(`/api/patients/${id}/records`);

  if (error) {
    return error.message;
  }

  if (!data) {
    return (
      <tbody>
        <tr className="hover text-sm">
          <td>
            <span className="loading loading-ball loading-sm"></span>
          </td>
          <td>
            <span className="loading loading-ball loading-sm"></span>
          </td>
          <td>
            <span className="loading loading-ball loading-sm"></span>
          </td>
          <td>
            <span className="loading loading-ball loading-sm"></span>
          </td>
          <td>
            <span className="loading loading-ball loading-sm"></span>
          </td>
          <td>
            <span className="loading loading-ball loading-sm"></span>
          </td>
          <td>
            <span className="loading loading-ball loading-sm"></span>
          </td>
          <td>
            <span className="loading loading-ball loading-sm"></span>
          </td>
          <td className="flex gap-1 justify-center">
            <span className="loading loading-ball loading-sm"></span>
          </td>
        </tr>
      </tbody>
    );
  }

  if (data.length === 0) {
    return (
      <tbody>
        <tr className="hover text-2xl text-center">
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {data?.map((record: any, index: number) => {
        const createdDateParse = Date.parse(record.createdAt);
        const createdDate = new Date(createdDateParse);
        const createdDateFormat = createdDate.toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });
        const updatedDateParse = Date.parse(record.updatedAt);
        const updatedDate = new Date(updatedDateParse);
        const updatedDateFormat = updatedDate.toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });
        return (
          <tr key={record.id} className="hover text-sm">
            <td>{index + 1}</td>
            <td>{record.weight} kg</td>
            <td>{record.height} cm</td>
            <td>{record.bloodPressure} mmHg</td>
            <td>{record.bloodSugarLevel} mg/dL</td>
            <td>{record.note}</td>
            <td>{createdDateFormat}</td>
            <td>{updatedDateFormat}</td>
            <td className="flex gap-2 justify-center">
              <EditRecord record={record} />
              <DeleteRecord record={record} />
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}
