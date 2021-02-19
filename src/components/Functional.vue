<script>
import {h} from 'vue'
// vue3中函数式组件只能用函数方式声明
function Heading(props, context) {
  console.log('functional comp Heading', context)
  return h(`h${props.level}`, context.attrs, context.slots)
}
Heading.props = ['level']
export default Heading
</script>