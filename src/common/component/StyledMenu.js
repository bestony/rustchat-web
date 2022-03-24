import styled from "styled-components";
const StyledMenu = styled.ul`
  z-index: 999;
  display: flex;
  flex-direction: column;
  padding: 4px 12px;
  background-color: #fff;
  box-shadow: 0px 20px 25px 20px rgba(31, 41, 55, 0.1),
    0px 10px 10px rgba(31, 41, 55, 0.04);
  border-radius: 6px;
  .item {
    white-space: nowrap;
    cursor: pointer;
    padding: 8px 0;
    /* margin: 0 12px; */
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: #616161;
    &.underline {
      border-bottom: 1px solid #e5e5e5;
    }
    &.danger {
      color: #a11043;
    }
  }
`;

export default StyledMenu;