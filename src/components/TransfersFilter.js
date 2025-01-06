import React, {useContext, useState} from "react";
import { Card, List, Checkbox, Divider, Typography  } from 'antd';
import { useColStyle } from "antd/es/grid/style";
import { context } from "../App";

const { Group: CheckboxGroup } = Checkbox;

const plainOptions =[ "1 пересадка", "2 пересадки", "3 пересадки"];
const defaultcheckedList = ["1 пересадка", "2 пересадки"];
const TranfersFilter = () => {
    const [checkedList, setCheckedList] = useState(defaultcheckedList);
    const checkAll = plainOptions.length === checkedList.length;
    const indeterminate = checkedList.length > 0  && checkedList.length < plainOptions.length;

    const { data,
      flights,
      setFlights,
      filterByTransfer } = useContext(context);
    const onChange = (list) => {
        setCheckedList(list);
        
    }
    const onCheckAllChange = (e) => {
        setCheckedList(e.target.checked ? plainOptions : []);
    }

   
    return <div >
        {/* <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
            Все
        </Checkbox>
        <Divider />
      <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} /> */}
      
      <List
        header={<Checkbox
            indeterminate={indeterminate}
            onChange={onCheckAllChange}
            checked={checkAll}
          >
            Все
          </Checkbox>}
          style={{
            width: "300px"
          }}
       
        bordered
        dataSource={[...plainOptions]}
        renderItem={(item) => (
          <List.Item>
            <Checkbox
              checked={checkedList.includes(item)}
              onChange={(e) =>
                onChange(
                  e.target.checked
                    ? [...checkedList, item]
                    : checkedList.filter((i) => i !== item)
                )
              }
            >
              {item}
            </Checkbox>
          </List.Item>
        )}
      />
        
  
    </div>


}
export default TranfersFilter;