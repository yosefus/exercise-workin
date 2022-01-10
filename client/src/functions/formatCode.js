export default function formatCode(str, classN) {
  return str.split('}').map((a, i) => (
    <div className={classN} dir="ltr" key={`i${i}`}>
      {a};
    </div>
  ));
}
