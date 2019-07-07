<?php
$mysql = NEW MySQL('localhost', 'Dubbydb767!', 'test');

$resultSet = $mysql->query("SELECT r_title FROM perf_review.role");
$colorOne = "lightblue";
$colorTwo = "teal";
$color = $colorOne;
?>
<select name="roleDropdown">
<?php
while($rows = $resultSet->fetch_assoc())
{
    $color == $colorOne ? $color = $colorTwo : $color = $colorOne
    $role_name = $rows['role_name'];
    echo "<option value='$role_name' style='background:$color;'>
    $role_name$</option>";
}
?>
</select>


`<td><select id="first-choice">
			<option selected value="base">Please Select</option>
			<option value="Biggie">Biggie</option>
			<option value="Little Biggie">Little Biggie</option>
			</select></td>`