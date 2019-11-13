import styled from "styled-components";

export const StyledTab = styled.div`
  text-transform: capitalize;
  user-select: none;
  padding: 10px 15px;
  border-bottom: ${p =>
    p.active ? "2px solid var(--color-accent)" : "2px solid transparent"};
  cursor: pointer;
  &:hover {
    border-bottom: ${p =>
      p.active
        ? "2px solid var(--color-accent)"
        : "2px solid rgba(0,0,0, 0.3)"};
  }
`;

const StyledTabs = styled.div`
  .tab-header {
    display: flex;
    margin-bottom: 1rem;
    background: var(--bg-sections);
  }
  .tab-content {
    padding: 15px;
    background: var(--bg-sections);
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.12), 0 1px 6px rgba(0, 0, 0, 0.03),
      0 6px 10px -8px rgba(0, 0, 0, 0.1);
  }
`;
export default StyledTabs;
