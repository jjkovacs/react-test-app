import './BlockM.css';

function BlockM({cheer}) {
  function doSomething() {
    alert(cheer);
  }

  return (
    <div className="BlockMClass" onClick={doSomething}></div>
  );
}

export default BlockM;
